import React, { Component } from "react";
import { Icon } from "react-icons-kit";
import { filePath } from "../../Constants";
import { facebook, twitter, instagram } from "react-icons-kit/icomoon";
export default class T2fourthsection extends Component {
  render() {
    const {
      title,
      author,
      description,
      twitter: tt,
      insta,
      fb,
      image
    } = this.props;

    return (
      <div>
        <div className="article-content container">
          <div className="article-author-bio">
            {image && (
              <img className="bio-img" src={filePath + image} alt={image} />
            )}
            {author && <span className="bio-author">{author}</span>}
            {/* <span className="bio-author-title">{}</span> */}
            {title && <span className="bio-title">{title}</span>}
            {description && (
              <div>
                <p className="bio-desc text-center">{description}</p>
              </div>
            )}
            <div className="bio-social">
              {tt && (
                <a href={tt}>
                  <Icon icon={twitter} />
                </a>
              )}
              {fb && (
                <a href={fb}>
                  <Icon icon={facebook} />
                </a>
              )}
              {insta && (
                <a href={insta}>
                  <Icon icon={instagram} />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
