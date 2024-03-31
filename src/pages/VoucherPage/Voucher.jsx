import {useSelector} from "react-redux";
import React, {useEffect} from "react";
import {Link} from "react-router-dom";
import {constants as c} from "../../constants";
import {handleImgErr} from "../../helper";

const Header = React.lazy(() => import('../../components/Header'));
const Footer = React.lazy(() => import('../../components/Footer'));
const CategoryCard = React.lazy(() => import('../../components/CategoryCard'));

function Voucher() {
    const categories = useSelector(state => state.category.categories);
    return (

        <React.Fragment>
            <div className="categories-page">
                <h3>Chương trình khuyến mãi</h3>
                <div className="" style={{display: "flex"}}>
                    {/*<Link*/}
                    {/*    style={{*/}
                    {/*        cursor: "pointer",*/}
                    {/*    }}*/}
                    {/*    to={`/ma-giam-gia`}>*/}
                    {/*    <div*/}
                    {/*        className="sub-menu-2-item"*/}
                    {/*        style={{*/}
                    {/*            display: "flex",*/}
                    {/*            height: "45px",*/}
                    {/*        }}*/}
                    {/*    >*/}
                    {/*        <img src="../../img/coupon.png"/>*/}
                    {/*        <p style={{*/}
                    {/*            marginTop: 15,*/}
                    {/*            marginLeft: 10,*/}
                    {/*        }}>Voucher</p>*/}
                    {/*    </div>*/}
                    {/*</Link>*/}
                    {/*<Link*/}
                    {/*    style={{*/}
                    {/*        cursor: "pointer",*/}
                    {/*    }}*/}
                    {/*    to={`/combo-giam-gia`}*/}
                    {/*>*/}
                    {/*    <div*/}
                    {/*        className="sub-menu-2-item"*/}
                    {/*        style={{*/}
                    {/*            display: "flex",*/}
                    {/*            height: "45px",*/}
                    {/*        }}*/}
                    {/*    >*/}

                    {/*        <img src="../../img/iconcombo.png" style={{*/}
                    {/*            width: 50,*/}
                    {/*            height: 50,*/}
                    {/*            backgroundColor: "black"*/}
                    {/*        }}/>*/}
                    {/*        <p style={{*/}
                    {/*            marginTop: 15,*/}
                    {/*            marginLeft: 10*/}
                    {/*        }}>*/}
                    {/*            Combo tặng thưởng*/}
                    {/*        </p>*/}
                    {/*    </div>*/}
                    {/*</Link>*/}
                    <div style={{
                        width: "50%",
                    }}>
                        <Link to={`/ma-giam-gia`}>
                            <div className="category-card">
                                <div className="image">
                                    <div className="" style={{
                                        height: 100,
                                        marginLeft: "auto",
                                        marginRight: "auto",
                                        width: 100
                                    }}>
                                        <img src="../../img/coupon.png" style={{
                                        }}/>
                                    </div>
                                </div>
                                <div className="title">
                                    <div style={{textAlign: "center"}}>
                                        Voucher
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </div>
                    <div style={{width: "50%"}}>
                        <Link to={`/combo-giam-gia`}>
                            <div className="category-card">
                                <div className="image">
                                    <div className="" style={{
                                        height: 100,
                                        marginLeft: "auto",
                                        marginRight: "auto",
                                        backgroundColor: "black",
                                        width: 100
                                    }}>
                                        <img src="../../img/iconcombo.png"/>
                                    </div>
                                </div>
                                <div className="title">
                                    <div style={{textAlign: "center", paddingTop: 5}}>
                                        Combo tặng thưởng
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </div>

                </div>
            </div>
            <Footer/>
        </React.Fragment>
    )
}

export default Voucher