import React, { useEffect, useState } from "react";
import "./Detailpage.css"
import "../Homepage/homepage.scss"
import { motion } from "framer-motion"
import Navbar from "../../components/Navbar/Navbar";
import Banner from '../../components/Banner/Banner'
import { defaultPageFadeInVariants } from "../../motionUtils";
const Detailpage = () => {
    const [categoryList, setCategoryList] = useState([]);
    useEffect(() => {
        async function categoryList() {
            // debugger;
            let categoryListResponse = await getCategoryList();
            // console.log("category list : ", categoryListResponse);
            setCategoryList(categoryListResponse);
        }
        categoryList();
    }, []);
    console.log("category list ", categoryList);
    return (
        <>
            <Navbar />
            <Banner categoryList={categoryList} />
            <div className="container">
            <div className="row">
                <div className="scrolling-wrapper">
                <h1 className='heading-color'>Top Billed Cast</h1>
                <div className="card">
                    <div>
                        <img src="https://images.unsplash.com/photo-1678541192455-e1e96bdf1b9a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80"></img>
                    </div>
                    <div className="actor-section">
                        <h3 className="actor-name">Tobey Margue</h3>
                        <p className="actor-character">Spiderman/Peter Parker</p>
                    </div>
                </div>
                <div className="card">
                    <div>
                        <img src="https://images.unsplash.com/photo-1678541192455-e1e96bdf1b9a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80"></img>
                    </div>
                    <div className="actor-section">
                        <h3 className="actor-name">Tobey Margue</h3>
                        <p className="actor-character">Spiderman/Peter Parker</p>
                    </div>
                </div>
                <div className="card">
                    <div>
                        <img src="https://images.unsplash.com/photo-1678541192455-e1e96bdf1b9a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80"></img>
                    </div>
                    <div className="actor-section">
                        <h3 className="actor-name">Tobey Margue</h3>
                        <p className="actor-character">Spiderman/Peter Parker</p>
                    </div>
                </div>
                <div className="card">
                    <div>
                        <img src="https://images.unsplash.com/photo-1678541192455-e1e96bdf1b9a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80"></img>
                    </div>
                    <div className="actor-section">
                        <h3 className="actor-name">Tobey Margue</h3>
                        <p className="actor-character">Spiderman/Peter Parker</p>
                    </div>
                </div>
                <div className="card">
                    <div>
                        <img src="https://images.unsplash.com/photo-1678541192455-e1e96bdf1b9a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80"></img>
                    </div>
                    <div className="actor-section">
                        <h3 className="actor-name">Tobey Margue</h3>
                        <p className="actor-character">Spiderman/Peter Parker</p>
                    </div>
                </div>
                <div className="card">
                    <div>
                        <img src="https://images.unsplash.com/photo-1678541192455-e1e96bdf1b9a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80"></img>
                    </div>
                    <div className="actor-section">
                        <h3 className="actor-name">Tobey Margue</h3>
                        <p className="actor-character">Spiderman/Peter Parker</p>
                    </div>
                </div>
                <div className="card">
                    <div>
                        <img src="https://images.unsplash.com/photo-1678541192455-e1e96bdf1b9a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80"></img>
                    </div>
                    <div className="actor-section">
                        <h3 className="actor-name">Tobey Margue</h3>
                        <p className="actor-character">Spiderman/Peter Parker</p>
                    </div>
                </div>
                <div className="card">
                    <div>
                        <img src="https://images.unsplash.com/photo-1678541192455-e1e96bdf1b9a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80"></img>
                    </div>
                    <div className="actor-section">
                        <h3 className="actor-name">Tobey Margue</h3>
                        <p className="actor-character">Spiderman/Peter Parker</p>
                    </div>
                </div>

            </div>
                
            </div>
            <div className="row">
                <div className="sidebar-section">
                <div className="status">
                    <p className="status-title"><b>Status</b></p>
                    <p className="status-detail">Released</p>
                </div>
                <div className="language">
                    <p className="language-title"><b>Original Language</b></p>
                    <p className="language-detail">English</p>
                </div>
                <div className="budget">
                <p className="budget-title"><b>Budget</b></p>
                    <p className="budget-detail">$10,00000</p>
                </div>
                <div className="revenue">
                <p className="revenue-title"><b>Revenue</b></p>
                    <p className="revenue-detail">$20,00000</p>
                </div>
                </div>
            </div>
            </div>
        </>
    )
}
export default Detailpage