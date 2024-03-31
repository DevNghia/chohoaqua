
import { useSelector } from "react-redux";
import React, { useEffect, useMemo } from "react";
import ImageModal from "../../../components/Modal/ImageModal";
import { constants as c } from "../../../constants";
export default function HomePopups(props) {
    const { popups } = props;
    const appTheme = useSelector(state => state.app.appTheme);
    const homeInfo = useSelector(state => state.app.home);
    const info = useMemo(() => {
        if (homeInfo.status === c.SUCCESS) {
            return {
                popups: homeInfo.popups,
            }
        } else {
            return {};
        }
    }, [homeInfo]);
    return (
        info == null || info.popups == null ? <div></div> : <div>
            <ImageModal />
            {
                info.popups.map((v, i) => <ImageModal imageUrl={v.link_image}/>)
            }
        </div>
    )
}