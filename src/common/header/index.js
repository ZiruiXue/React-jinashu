import React,{ Component } from 'react';
import { HeaderWrapper,Logo,Nav,NavItem,NavSearch,Addition,Button,
    SearchWrapper,SearchInfo,SearchInfoTitle,SearchInfoSwitch,
    SearchInfoItem,SearchInfoList } from './style';
import { CSSTransition } from 'react-transition-group';
import { connect } from 'react-redux';
import { actionCreators }  from './store';


class Header extends Component {

    getListArea () {
        const { focused,list,page,totalPage,mouseIn,handleMounseEnter,handleMouseLeave,handleChangePage } = this.props;
        const newList = list.toJS();
        const pageList = [];
        // 当获取到数据之后，再去渲染，key值就不会是undefined
        if(newList.length) {
            for(let i = (page-1) * 10; i < page*10; i++){
                pageList.push(
                    <SearchInfoItem key = {newList[i]}>{newList[i]}</SearchInfoItem>
                )
            }
        }
        if(focused || mouseIn) {
            return (
                <SearchInfo onMouseEnter={handleMounseEnter} onMouseLeave={handleMouseLeave}>
                    <SearchInfoTitle>
                        热门搜索
                        <SearchInfoSwitch onClick={()=>handleChangePage(page,totalPage,this.spinIcon)}>
                            <i ref={(icon) => {this.spinIcon = icon}} className="iconfont spin">&#xe852;</i>
                            换一批
                        </SearchInfoSwitch>
                        <SearchInfoList>
                            {pageList}
                        </SearchInfoList>
                    </SearchInfoTitle>
                </SearchInfo>  
            )
        }else{
            return null;
        }
    };

    render () {
        const { focused,list,handleInputFocus,handleInputBlur } = this.props;
        return (
            <HeaderWrapper>
                <Logo/>
                <Nav>
                    <NavItem className='left active'>首页</NavItem>
                    <NavItem className='left'>下载App</NavItem>
                    <NavItem className='right'>登录</NavItem>
                    <NavItem className='right'>
                        <i className="iconfont">&#xe636;</i>
                    </NavItem>
                    <SearchWrapper>
                        <CSSTransition
                            in={focused}
                            timeout={200}
                            classNames = 'slide'
                        >
                            <NavSearch
                                className = {focused ? 'focused' : ' '}
                                onFocus = {() => handleInputFocus(list)}
                                onBlur = {handleInputBlur}
                            >
                            </NavSearch>
                        </CSSTransition>
                        <i className = {focused ? 'focused iconfont zoom' : 'iconfont'}>&#xe6dd;</i>
                        {this.getListArea()}
                    </SearchWrapper>
                    <Addition>
                        <Button className = 'writting'>
                            <i className="iconfont">&#xe615;</i>
                            写文章
                        </Button>
                        <Button className = 'reg'>注册</Button>
                    </Addition>
                </Nav>
            </HeaderWrapper>
        )
    }
}

// store的数据映射到组件中
const mapStateToProps = (state) => {
    return {
        focused: state.getIn(['header','focused']),
        list: state.getIn(['header','list']),
        page: state.getIn(['header','page']),
        totalPage: state.getIn(['header','totalPage']),
        mouseIn: state.getIn(['header','mouseIn'])
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        handleInputFocus(list) {
            // 如果size === 0，去发送ajax请求
            (list.size === 0) && (dispatch(actionCreators.getList()));
            dispatch(actionCreators.searchFocus());
        },
        handleInputBlur() {
            dispatch(actionCreators.searchBlur());
        },
        handleMounseEnter(){
            dispatch(actionCreators.mouseEnter());
        },   
        handleMouseLeave() {
            dispatch(actionCreators.mouseLeave());
        },
        handleChangePage(page,totalPage,spin) {
            // 把数字替换成‘’
            let originAngle = spin.style.transform.replace(/[^0-9]/ig,'');
            if(originAngle){
                originAngle = parseInt(originAngle,10); //转换成正整数
            }else{
                originAngle = 0;
            }
            spin.style.transform = 'rotate('+(originAngle + 360) +"deg)";
            if(page < totalPage){
                dispatch(actionCreators.changePage(page+1));
            }else{
                dispatch(actionCreators.changePage(1));
            }
        }
    } 
} 

export default connect(mapStateToProps,mapDispatchToProps)(Header);