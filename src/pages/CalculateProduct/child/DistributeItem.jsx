import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { findStock } from "../../../utils/productUltis";

export default function DistributeItem(props) {

    var { distributes } = props

    const [element_name, setElementName] = useState(null);
    const [sub_name, setSubName] = useState(null);
    const [id, setId] = useState(null);


    function changeDistribute(element,sub,id){
        setElementName(element)
        setSubName(sub)
        setId(id)
    }


    function submitDistribute(){
        if(id == null || id == "")
        return;
       props.changeDistribute(element_name,sub_name,id)
       props.cancelDistribute()
    }

    const appTheme = useSelector((state) => state.app.appTheme);
    console.log(distributes,sub_name,element_name , id)

    if (distributes.length > 0) {

        return (
            <div
            className={`distribute-select ${props.isShowDistribute ? "active" : ""
                        }`}
            >
                <div className="row">
                    {distributes?.map((v, i) => (
                        <button
                            key={i}
                            onClick = {()=> changeDistribute(v.element_distribute_name , v.sub_element_distribute_name , v.id)}
                            style={
                                v.element_distribute_name === element_name && v.sub_element_distribute_name === sub_name
                                    ? {
                                        backgroundColor: appTheme.color_main_1,
                                        color: "white",
                                    }
                                     : {}
                            }
                        >
                            {`${v.element_distribute_name}${v.sub_element_distribute_name != null? ", "+v.sub_element_distribute_name : ""}`}
                        </button>
                    ))}
                </div>
              
                <div
                    style={{
                        marginTop: "1em",
                        display: "flex",
                        justifyContent: "space-between",
                    }}
                >
                    <button onClick={props.cancelDistribute}>Hủy</button>


                    <button
                        onClick={submitDistribute}
                        style={{
                            background: appTheme.color_main_1,
                            color: "white",
                        }}
                    >
                        Xác nhận
                    </button>





                </div>
            </div>

        )
    }

    return <div></div>
}

