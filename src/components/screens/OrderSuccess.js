import React, { Component } from 'react'
import classNames from 'classnames'
import { connect } from 'react-redux'
import Icon from 'react-icons-kit'
import {ic_done} from 'react-icons-kit/md/'
import CustomLink from '../CustomLink'
import {
    HomeSliderSection,
  } from "../";

class OrderSuccess extends Component {
    componentDidMount(){
        const {
            history, location, countryCode
        } = this.props
        if(location && location.state && location.state.order){
            document.body.scrollTop = document.documentElement.scrollTop = 0
        }else{
            history.push(`/${countryCode}`)
        }
    }
    getItemList = productIds => {        
        const items = productIds.map(item => {
            if(item){
                const {
                    qty
                } = item
                if(item.title)
                    return `${item.title} x ${qty}`
                
                if(item.producttitle)
                    return `${item.producttitle} x ${qty}`

                if(item.productid){
                    return `${item.productid.producttitle} x ${qty}`
                }
            }
            
            return null
        })

        return items.filter(el => el)
    }
    render() {
        const {
            className,
            countryCode,
            products,
            location, user
        } = this.props
        const {
            state
        } = location
        if(state && state.order){
            const {
                transactionId,
                userDetails
            } = state.order
            const items = this.getItemList(state.order.products)
            console.log({
                items
            })
            return (
                <div className={classNames({
                    [className]: className
                })}>
                    <div className="container-extend mt-5">
                        <div className="border order-success shadow">
                            <div className="row order-success__row">
                                <div className="col-12 order-success__column p-5">
                                    <div className="order-success__msg-wrapper">
                                        <div className="order-success__icon-wrapper">
                                            <Icon size={40} icon={ic_done} />
                                        </div>
                                        <div className="order-success__content-wrapper">
                                            <h3 className="order-success__title">
                                                Thank you for shopping with us
                                            </h3>
                                            <p>
                                                Please check your email for order confirmation and detailed delivery information.
                                            </p>
                                            <p><b>Order Number {transactionId}</b></p>
                                            {items && items.length > 0 && <ul>
                                                {
                                                    items.map((el, index) =>{
                                                        return <li key={index}>{el}</li>
                                                    })
                                                }
                                            </ul>}
                                            <p>This order will be delivered to <b>{userDetails && userDetails.firstname}</b> from Bené</p>
                                            { user && user._id && 
                                                <CustomLink className="hover-text-line d-inline-block" to={"/"+countryCode+"/my-account/"}>
                                                Review your order 
                                                </CustomLink>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="container-extend text-center mb-5">
                        <div style={{
                            width:"400px",
                            maxWidth: "100%",
                            margin: "auto",
                            textAlign: "center"
                        }}>
                            <CustomLink to={"/"+countryCode+"/shop/"} className="btn1" >
                                Continue shopping
                            </CustomLink> 
                        </div>
                    </div>
                    <div className="container-extend text-center">
                        {products && products.featured && 
                            <div>
                                <h1 className="text-center mt-5 product-title">
                                    Other top rated products
                                </h1>
                                <HomeSliderSection
                                    noTitle={true}
                                    productArr={products.featured}
                                />
                            </div>
                        }
                    </div>
                </div>
            )
        }
        return <div />
    }
}

const mapStateToProps = state => ({
    countryCode: state.location.countryCode,
    products: state.products,
    user: state.user,
})

export default connect(mapStateToProps)(OrderSuccess)