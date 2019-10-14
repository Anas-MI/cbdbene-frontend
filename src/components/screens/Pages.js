import React, { PureComponent } from "react";
import TemplateType02 from "../templates/TemplateType02";
import TemplateType01 from "../templates/TemplateType01";
import { Lodar } from "../";
import { connect } from "react-redux";
import classNames from "classnames";
import {
  layout1secondSectionSorter,
  layout1thirdSectionSorter,
  loyout1fourthSectionSorter
} from "../templates/template02/jsonHelper";
import { layout2secondSectionSorter } from "../templates/template01/jsonHelper2";
import { Redirect } from "react-router-dom";
import { getPageContentApi } from "../../services/api/";
import {
  getCountryName,
  getPageContent,
  getContinentName
} from "../../services/extra";
import Comingsoon from "../templates/Comingsoon";
import HomeTemplate from "../templates/HomeTemplate";
import HtmlTemplate from "../templates/HtmlTemplate";
// import { string } from 'prop-types';
class Pages extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      ispagecontent: false,
      pageLayout: null,
      isNull: false,
      notCountry: false,
      pagecontent: {},
      SpinnerToggle: true
    };
  }
  componentDidMount() {
    this.getPage();
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.match.params.pagetitle !== this.props.match.params.pagetitle
    ) {
      this.getPage(nextProps);
    }
  }
  gotopage() {
    const { pageLayout, pagecontent, isNull } = this.state;

    if (isNull) {
      this.setState({
        ispagecontent: true
      });
      return;
    }
    if (pageLayout === "layout1") {
      const secondsection = layout1secondSectionSorter(
        pagecontent.secondsection
      );
      const thirdsection = layout1thirdSectionSorter(pagecontent.thirdsection);

      const fourthsection = loyout1fourthSectionSorter(
        pagecontent.fourthsection
      );
      const newContent = {
        ...pagecontent,
        secondsection,
        thirdsection,
        fourthsection,
        secondVisbility: pagecontent.secondsection.visibility,
        thirdVisbility: pagecontent.thirdsection.visibility,
        fourthVisbility: pagecontent.fourthsection.visibility
      };
      this.setState({
        pagecontent: newContent,
        // ispagecontent: false,
        pageLayout: "layout1",
        ispagecontent: true
      });

      return;
    }
    if (pageLayout === "home") {
      this.setState(
        {
          pagecontent,
          pageLayout,
          ispagecontent: true
        },
        () => {}
      );
    }
    if (pageLayout === "html") {
      this.setState(
        {
          pagecontent,
          pageLayout,
          ispagecontent: true
        },
        () => {}
      );
    }
    if (pageLayout === "layout2") {
      const secondsection = layout2secondSectionSorter(
        pagecontent.secondsection
      );
      const thirdsection = pagecontent.thirdsection;

      const newContent = {
        ...pagecontent,
        secondsection,
        thirdsection
      };
      this.setState({
        pagecontent: newContent,
        pageLayout: "layout2",
        ispagecontent: true
      });

      return;
    }
  }
  getPage(props) {
    this.setState(
      {
        ispagecontent: false,
        pageLayout: null,
        pagecontent: {}
      },
      () => {
        const { match, location } = props || this.props;
        const type = match.params.pagetitle.split("!")[1];

        if (type === "comingsoon") {
          this.setState({
            pageLayout: "comingsoon",
            ispagecontent: true
          });

          return;
        }

        getPageContentApi({
          id: match.params.pagetitle
        })
          .then(res => {
            if (res.status === 404) {
              this.setState({
                notCountry: true
              });
              return res;
            }
            return res.json();
          })
          .then(resJson => {
            if (resJson.status === 404) {
              this.setState({
                notCountry: true,
                SpinnerToggle: false
              });
            }
            if (!resJson.status) {
              this.setState({
                notCountry: true,
                SpinnerToggle: false
              });
            } else {
              if (resJson.content) {
                // const { layout, pagecontent } = resJson.content;
                const countryName = getCountryName(location.countryCode);
                const continentName = getContinentName(countryName);
                const content = getPageContent(resJson.content, continentName);
                const { layout, pagecontent } = content;
                this.setState(
                  {
                    pageLayout: layout,
                    pagecontent,
                    SpinnerToggle: false
                  },
                  this.gotopage
                );
              } else {
                this.setState(
                  {
                    isNull: true,
                    SpinnerToggle: false
                  },
                  this.gotopage
                );
              }
            }
          })
          .catch(err => {
            this.setState(
              {
                isNull: true,
                SpinnerToggle: false
              },
              this.gotopage
            );
          });
      }
    );
  }
  render() {
    const {
      ispagecontent,
      pageLayout,
      pagecontent,
      isNull,
      notCountry
    } = this.state;
    const { location, className } = this.props;
    if (notCountry) return <Redirect to={`/${location.countryCode}/404`} />;

    if (!ispagecontent) return <Lodar />;
    else if (isNull) return <Redirect to={`/${location.countryCode}/404`} />;
    else
      switch (pageLayout) {
        case "layout1":
          return (
            <div
              className={classNames("", {
                [className]: className
              })}
            >
              {this.state.SpinnerToggle && <Lodar />}
              <TemplateType02 pagecontent={pagecontent} />
            </div>
          );

        case "home":
          return (
            <HomeTemplate
              className={classNames("", {
                [className]: className
              })}
              pagecontent={pagecontent}
            />
          );

        case "html":
          return (
            <div>
              {this.state.SpinnerToggle && <Lodar />}
              <HtmlTemplate
                className={classNames("", {
                  [className]: className
                })}
                pagecontent={pagecontent}
              />
            </div>
          );

        case "layout2":
          return (
            <div>
              {this.state.SpinnerToggle && <Lodar />}
              <TemplateType01
                className={classNames("", {
                  [className]: className
                })}
                pagecontent={pagecontent}
              />
            </div>
          );

        case "comingsoon":
          return (
            <div>
              {this.state.SpinnerToggle && <Lodar />}
              <Comingsoon
                className={classNames("", {
                  [className]: className
                })}
              />
            </div>
          );

        default:
          return <div />;
      }
  }
}
const mapStateToProps = state => ({
  location: state.location
});
export default connect(mapStateToProps)(Pages);
