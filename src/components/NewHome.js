import React, { Component, lazy, Suspense } from "react";
import { connect } from "react-redux";
import { 
  // Banner, 
  CustomLink } from ".";
import { imagePack } from "./Constants";
// import { CatTabProductSlider } from "./catTabSlider";
// import { ProductListing } from "./productListing";
// import {
//   // FullScreenSlider,
//   // FullSlide,
//   // FullBtnSlider
// } from "./fullScreenSlider";
// import { BasicIntro } from "./basicIntro";
// import IconDescList from "./IconDescList";
// import { QuestionSet2 } from "./questionSet";
import { questions, productsAns } from "../static/Question";
import Banner2 from "./Banner2";

const CatTabProductSlider = lazy(()=> import("./catTabSlider/CatTabProductSlider"))
const QuestionSet2 = lazy(()=> import("./questionSet/QuestionSet2"))
const IconDescList = lazy(()=> import("./IconDescList"))
const FullBtnSlider = lazy(()=> import("./fullScreenSlider/FullBtnSlider"))
const ProductListing = lazy(()=> import("./productListing/ProductListing"))

class NewHome extends Component {
  isSecVisible(obj, key) {
    if (!obj) return false;
    if (!obj[key]) return false;
    if (!obj[key].visibility === "no") return false;
    return true;
  }
  getCombo(list) {
    return list.filter(el => el.combo);
  }
  scrollToDiv() {
    console.log({
      questionSection: this.questionSection
    });
    window.scrollTo(0, this.questionSection.offsetTop);
  }
  scrollToTopQuiz() {
    window.scrollTo(0, 600);
  }
  render() {
    const {
      products: { products },
      location: { countryCode }
    } = this.props;
    const comboLink = "/" + countryCode + "/category/Bundles";
    return (
      <Suspense fallback={<div>Loading...</div>}>
        <Banner2
          image={imagePack.homeBannerImage3}
          title="Bené"
          // smallTitle="Skin Care+"
          description="The CBD brand recommended by doctors."
          subDescription="We have the widest range of CBD products, all manufactured in the USA, from organically grown hemp."
          linkText="Explore All Products"
          link={`/${countryCode}/shop`}
          scrollToDiv={() => this.scrollToDiv()}
        />
        {/* <Banner
          title="Bené-fits all!"
          imagelink={imagePack.homeBannerImage}
          btntext="Premium products"
          btnlink={`/${countryCode}/shop`}
          description="CBD. Created for wellness. Created for you."
        /> */}
        <CatTabProductSlider />
        {/* <BasicIntro
          smallTitle="New to Cbd"
          title="How to cleanse the skin"
          description="Both delicate and resilient, skin requires gentle, routine cleansing. To better understand cleansing and its foundational role in a healthy skin care routine, we invite you to read on."
          btnText="Next cleansing"
        />
        <hr /> */}
        <div
          style={{ display: "block" }}
          ref={el => (this.questionSection = el)}
        />
        <QuestionSet2
          history={this.props.history}
          questions={questions}
          products={productsAns}
          id="quactionSection"
        />
        <hr />
        <br />
        <br />
        <ProductListing
          title="Bundles of awesomeness!"
          // className="sub-bg-color"
          btnText="View all"
          // description="Buy Combos And Kits products Online from Cbdbené.com. Widest Range with Attractive Prices. Find widest range of products in Combos And Kits."
          description={[
            "Give our bundles a try with our 60-day, money-back guarantee.",
            "The perfect gift. A great way to enjoy premium CBD at an incredible price. All bundles are 20% off."

            // "Not sure if CBD will for you?",
            // "You're not alone. A lot of people are new to CBD."
            // "In fact, we were in the same position not long ago."
          ]}
          link={comboLink}
          btnLink={comboLink}
          list={this.getCombo(products)}
          listBtnText="Add To Cart"
          listBtnTextAlter="Added"
          listLinkText="Learn More"
          history={this.props.history}
        />
        <IconDescList
          hoverCircle={true}
          list={[
            {
              image: imagePack.thirdPartyIcon,
              title: "THIRD PARTY TESTED"
            },
            {
              image: imagePack.affordableIcon,
              title: "AFFORDABLE"
            },
            {
              image: imagePack.allNaturalIcon,
              title: "ALL NATURAL"
            },
            {
              image: imagePack.veganIcon,
              title: "VEGAN"
            }
          ]}
        />
        {/* <FullScreenSlider
          // full={true}
          alwaysShowIcon={true}
          isTestimonial={true}
          slides={[
            {
              // title: "‘The frost performs its secret ministry, Unhelped by any wind.’",
              description:
                '"I’m so glad that I found you, your tincture has been a life saver and my dispensary will not reorder your product. Because my dispensary has not reordered, I found you and came directly to you!!! I will be back monthly! Your CBD is a life saver and helps my back immensely!"',
              author: "Tammi S.",
              userImage: imagePack.user1
            },
            {
              // title: "Demo title Demo title Demo title",
              description:
                '"I get very severe ringing in my ears and no medication that the doctor gave me would help alleviate any symptoms. However, since I have started taking CBD I have noticed far fewer flare ups which has increased my quality of life as well as my attitude and ability to sleep. Thank you!"',
              author: "Tammi S.",
              userImage: imagePack.user2
            },
            {
              // title: "Demo title",
              description:
                '"Me and my wife have just tried our first gram of CBD Isolate. It takes all our discomfort away for a good amount of time. Thanks a lot look forward to becoming a regular customer."',
              author: "Scott R.",
              userImage: imagePack.user3
            }
          ]}
        /> */}
        {/* <hr className="default" /> */}
        <FullBtnSlider
          // full={true}
          cover={{
            title: "ABOUT US",
            subTitle:
              "Bené means wellness in Italian. And that's what we're all about.",
            description: (
              <>
                <p>
                  We believe that wellness is a state of
                  balanced mental, emotional and physical health.
                </p>
                <p>
                  In our own quest to enhance total balance and reduce stress,
                  we set out to understand, 
                  <CustomLink
                    className="hover-text-line"
                    to={`/${this.props.location.countryCode}/learn`}
                  >
                    what is CBD.
                  </CustomLink>
                    We met manufacturers from across the world. We spoke with
                  doctors. We personally tested products from a variety of
                  producers, all farmers of organically grown hemp, proudly made
                  in the USA. Today we're confident that were providing you with
                  the highest quality CBD you can find. Our{" "}
                  <CustomLink
                    className="hover-text-line"
                    to={`/${this.props.location.countryCode}/shop`}
                  >
                    product
                  </CustomLink>{" "}
                  line  is a collection, to suit a wide range of tastes and
                  needs. We're dedicated to 
                  <span
                    onClick={() => this.scrollToTopQuiz()}
                    className="hover-text-line"
                  >
                    helping you get the products that suit you,
                  </span>
                    as well as your pets. That's right, we have CBD
                  <CustomLink
                    className="hover-text-line"
                    to={`/${this.props.location.countryCode}/category/Pets`}
                  >
                     products for pets 
                  </CustomLink>{" "}
                  too.
                </p>
                <p>
                  Everything by Bené is backed by a 
                  <CustomLink
                    className="hover-text-line"
                    to={`/${this.props.location.countryCode}/cookies`}
                  >
                     60-day warranty. 
                  </CustomLink>{" "}
                  Your satisfaction is guaranteed or your money back.
                </p>
              </>
            )
            // btnText: "BEGIN JOURNEY"
          }}
          nextText="NEXT"
          prevText="PREVIOUS"
          finishText="FINISH"
          isFinish={true}
          slides={[
            {
              title: "Where does CBD come from?",
              description:
                "Hemp and Marijuana are the two main species of the cannabis plant. CBD can be extracted from marijuana flowers or from hemp leaves. While marijuana plants contain high levels of THC, hemp plants produce more CBD and contain less than 0.3% THC. This single difference is what distinguishes hemp from marijuana."
            },
            {
              title: "What is CBD oil?",
              description:
                "CBD oil is made by extraction from the plant and mixing it with a carrier oil that is often hemp seed or coconut oil. A true, quality full-spectrum CBD oil has many plant compounds including terpenes and flavonoids which work more effectively together than by themselves."
            },
            {
              title: "What are the Benefits of using CBD?",
              description:
                "CBD oil is being widely used to help with anxiety, inflammation, headaches, trauma, epilepsy, insomnia, arthritis, gut health, chronic and acute pain and a number of other health conditions. The effects of CBD are 100% therapeutic in nature ; it produces no psychoactive or intoxicating effects whatsoever."
            },
            {
              title: "Is CBD Oil Safe?",
              description:
                "CBD oil is extremely safe with almost a complete lack of side effects. The World Health Organization reported â€œCBD exhibits no effects indicative of any abuse or dependence potential...To date, there is no evidence of public health-related problemsâ€"
            },
            {
              title: "Is CBD Oil Legal?",
              description:
                "CBD products containing less than 0.3% THC are not controlled by the U.S. Drug Enforcement Agencyâ€™s (DEA) Controlled Substances Act and its purchase is completely legal in all 50 States of the United States."
            },
            {
              title: "How does CBD work",
              description:
                "The human body endocannabinoid system or ECS refers to the endogenous cannabinoids and the receptors that bind with them. The ECS is responsible for maintaining homeostasis and regulating essential functions like sleep, mood, and memory. CBD works by attaching to the receptors in this system, thereby impacting various metabolic processes."
            }
          ]}
        />
        {/* <FullSlide
          className="text-justify"
          description="we strive to make the highest quality CBD products accessible to anyone. Our hemp-derived CBD extracts are all made in-house. We domestically source our hemp from non-GMO farms, and only use crops with the highest cannabinoid content possible. We then use ethanol to extract the CBD and the terpenes from the plant material."
          title="Designed by nature. Perfected by science."
        /> */}
      </Suspense>
    );
  }
}
const mapStateToProps = state => ({
  location: state.location,
  products: state.products
});
export default connect(mapStateToProps)(NewHome);
