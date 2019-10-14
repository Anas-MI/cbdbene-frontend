import React, { Component } from 'react'
import classNames from "classnames";

export default class AddressRadio extends Component {
    
    onChange = e => {
        const {
            onChange
        } = this.props
        if(typeof onChange === "function")
            onChange(e)
    }

    render(){
        const {
            title,
            checked,
            id,
            address,
            name,
        } = this.props
        const {
            city,
            state,
            country,
            zip
        } = address || {}
        return (
            <div className={classNames("panel-section card", {
                shadow: checked,
                shadow2: !checked,
              })} >
                <label htmlFor={id}>
                  <div className="card-body">
                    <h6 className="text-capitalize">
                    <input 
                      type="radio" 
                      name={name} 
                      checked={checked}
                      class="float-right"
                      onChange={this.onChange}
                      id={id} 
                    /> {title}
                    </h6>
                    <div className="w-100">
                      <p className="l-h">{address.address}</p>
                      <p className="l-h mb-0">
                        {city && <span>{city}, </span>}
                        {state && <span>{state}, </span>}
                        {country && <span>{country}, </span>}
                        {zip && <span>{zip}. </span>}
                      </p>
                    </div>
                  </div>
                </label>
              </div>
        )
    }
}