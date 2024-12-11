/**
 * @description 默认首页
 * @author lihao
 * @date 2024/12/11 15:56
 */
import './front.css'
import {useState} from "react";
const Front = ()=>{
    const [isTagFormVisible,setTagFormVisible] = useState(false);
    const tags = [
        'java','test','ahhahahaha','nihao'
    ]
    const [tagsList,setTagsList] = useState(tags);
    return (
        <div className={'front-container'}>
            <div className={'left'}>
                <div className={'left-box'}>

                </div>
                <div className={'left-box'}>

                </div>
                <div className={'left-box'}>

                </div>
            </div>
            <div className={'right'}>
                <div className={'right-box'}>
                    <div className={'custom-tags'}>
                        <div className={'tag-list'}>
                            {/*<div className={'tag-box'}>

                            </div>*/}
                        </div>
                        <div className={'tag-button'}>
                            <button className={'tag-button-content'} onClick={()=>setTagFormVisible(!isTagFormVisible)}>
                                自定义标签
                            </button>
                        </div>
                    </div>
                    <div className={'feature-square'}>

                    </div>
                </div>
                {isTagFormVisible && (
                    <>
                        <div className={'overlay'} onClick={()=>setTagFormVisible(false)}></div>
                        <div className={'tag-form'}>
                            <p className={'tag-form-info'}>点击表单外区域自动关闭表单</p>
                            {tagsList.length > 0 ? (
                                tagsList.map((tag, index) => (
                                    <div className={'tag-form-box'} key={index}>
                                        {tag}
                                    </div>
                                ))
                            ) : (
                                <p>暂无标签！</p>
                            )}
                            <form className={'tag-form-content'}></form>
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}
export default Front