import React, { Component } from "react";
import classNames from "classnames";
export default class FaqPage extends Component {
  componentDidMount() {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  }
  render() {
    const { className } = this.props;
    return (
      <div
        className={classNames("", {
          [className]: className
        })}
      >
        <div className="container-extend pt-5 pb-5">
          <div className="text-center">
            <h2 className="pb-5">FAQ Section</h2>
          </div>
          <div className="pb-2 pt-2">
            <h3 className="pb-2">Is CBD Illegal?</h3>
            <div className="pl-3 pr-3">
              <p>
                If CBD has been derived from hemp plants and has less than 0.3%
                THC, it is absolutely, positively, 100% legal and has been for
                decades.
              </p>
              <p>
                Hemp has been used in this country for industrial and health
                purposes since George Washington grew it on his own farm before
                our great country was founded.
              </p>
              <p>
                What is illegal is CBD products that contain more than 0.3% THC
                because they are derived from marijuana plant.  THC is what gets
                you high.
              </p>
            </div>
          </div>
          <hr />
          <div className="pb-2 pt-2">
            <h3 className="pb-2">Does CBDs Get You High?</h3>
            <div className="pl-3 pr-3">
              <p>
                Not really <b>NO.</b>
              </p>
              <p>
                Any marijuana plant that has over 0.3% THC concentration is
                technically illegal at a federal level in the United
                States.  This is the level below which the government has
                determined will not impair your mental capabilities and is
                non-psychoactive. <br />
                And the government and numerous scientific studies have
                determined CBD to be non-psychoactive.
              </p>
              <p>
                THC causes the “HIGH” in people feel when taking marijuana,
                so since CBD has extremely low or zero levels of THC, it
                won&#39;t get you high. <br />
                Rather CBD helps calm you down, focus, relieves anxiety and
                helps you sleep, so isn&#39;t that in a way
                &#39;psychoactive&#39;?
              </p>
              <p>
                The main difference is that CBD DOES NOT IMPAIR your ability to
                drive, work or perform everyday tasks.  In fact for the majority
                of patients it HELPS you do all those things.
              </p>
              <p>
                CBD acts on your Cannabinoid receptors that already exist in
                your body to calm your mind, help you sleep, and soothe your
                suffering.  But it will NOT make you feel &#39;high&#39;.
              </p>
              <p>
                And because of these ultra low THC levels, you don&#39;t have to
                worry about that next drug test... To be on the safe side, look
                for CBD that has NO THC content, and is hemp derived, like ours.
              </p>
            </div>
          </div>
          <hr />
          <div className="pb-2 pt-2">
            <h3 className="pb-2">Can I buy CBD in stores?</h3>
            <div className="pl-3 pr-3">
              <p>
                So If It&#39;s Legal, Effective, and Safe, Why Can&#39;t one Buy
                CBD in Stores?
              </p>
              <p>
                Even though hemp and CBDs are perfectly legal thanks to the 2014
                Federal Farm Bill, many banks view this industry is risky
                because they simply group all cannabis products together. 
                Because the Federal government has issued confusing statements
                about the legality of all cannabis products, the banks are often
                afraid to allow transactions involving CBD extracts.
              </p>
            </div>
          </div>
          <hr />
          <div className="pb-2 pt-2">
            <h3 className="pb-2">What are the benefits of CBD?</h3>
            <div className="pl-3 pr-3">
              <p>
                Now that you know, CBD is totally safe and can miraculously help
                you , Let see how it can benefit you.
              </p>
              <ul>
                <li>
                  <b>Pain</b> this miraculous plant has been shown to reduce
                  crippling nerve pain, back pain, joint pain, and many other
                  hard-to-treat pain for millions of patients. CBD has been
                  shown to relieve many of the most common and hardest-to-treat
                  types of pain in the world.
                  <ul>
                    <li>
                      Back pain: A recent study showed CBD treatments led to
                      a significant decrease in disk degeneration, which is the
                      leading cause of back pain.
                    </li>
                    <li>
                      Nerve pain: a comprehensive review showed that CBD
                      treatments improved pain levels significantly for patients
                      suffering from nerve pain.
                    </li>
                    <li>
                      Joint pain, swelling, and inflammation was reduced by as
                      much as 47% in a study published in the European Journal
                      of Pain
                    </li>
                  </ul>
                </li>
                <li>
                  <b>Sleep</b> there&#39;s a &#39;catastrophic sleep-loss
                  epidemic&#39; happening in this country due to our hyper-
                  connected lifestyles and this incredible plant can restore the
                  restful, refreshing sleep you experienced in your younger
                  days. You’d simply crawl into bed exhausted, fall asleep, and
                  wake
                  <br />
                  up 8 hours later. No tossing and turning. You will wake up
                  with less stiffness and soreness after a good nights rest
                  thanks to CBD&#39;s ability to ease your pain and relax your
                  muscles.
                </li>
                <li>
                  <b>Anxiety:</b> Another symptom of our modern lifestyle is a
                  gnawing anxiety that, before now, has only been treatable with
                  dangerous psychotropic drugs.  All that will change with this
                  miracle plant. You can calm your body inside out with one of
                  nature&#39;s most powerful anti-inflammatories and
                  anti-oxidants
                </li>
                <li>
                  <b>Inflammation:</b> recent research has shown that most of
                  our health problems stem from some form of inflammation. 
                  Medical researchers now believe that inflammation is the
                  leading symptom of, and in many cases the actual cause of,
                  most of the health issues we experience in our life. The pain,
                  swelling, fatigue, digestion issues, brain fog, and general
                  discomfort you feel is likely caused by inflammation in your
                  body. Oxidation occurs when the body processes oxygen and free
                  radicals in the body.  These free radicals can cause cell
                  damage and affect your body&#39;s ability to repair itself.
                  CBD science is only beginning to unlock the benefits of this
                  incredible oil. Research and science is showing time and time
                  again that CBD has a profound effect on inflammation.
                </li>
              </ul>
            </div>
          </div>
          <hr />
          <div className="pb-2 pt-2">
            <h3 className="pb-2">
              How do I know that my CBD products are best quality
            </h3>
            <div className="pl-3 pr-3">
              <p>A million dollar question!</p>
              <p>
                You may have tried to use CBD oil products before, or maybe
                you&#39;re using one now.
              </p>
              <p>
                Either way it&#39;s critical to know where your product is
                really coming from.
                <br />
                Yes many suppliers tout it&#39;s Made in the USA!, but that
                doesn&#39;t mean the plants are grown in the US.
              </p>
              <p>
                In fact, like everything else we buy, more and more hemp is
                being sourced from China, India, and nations with very low
                quality standards. This is especially bad with CBD products
                because the hemp plant has a unique trait in the plant world:
              </p>
              <p>
                Hemp is a known bio-accumulator, which means that it sucks up a
                large amount of whatever’s in the soil it’s growing in. Not only
                that, but the growing conditions for hemp aren’t federally
                regulated, which makes it very difficult to know when you’re
                getting a high quality, clean, and safe product. Knowing the
                growing conditions of the soil, overall environment, and
                extraction methods is crucial because hemp is known to absorb
                toxic spills, pesticides, and other dangerous chemicals that you
                don’t want to be ingesting.
              </p>
              <p>
                That means if the soil contains heavy metals, pesticides, or
                nasty chemicals, your CBD oil is going to have those things too.
                And if a CBD supplier is getting their hemp overseas,
                there&#39;s very little they can do to ensure their plants are
                from quality farmers.
              </p>
              <p>
                They buy in bulk from exchanges where the original grower is so
                far removed from the end user there&#39;s no way to tell just
                how good the hemp really is.
              </p>
              <p>
                You Deserve a True and Honest CBD Supplement extracted from high
                quality hemp plant
              </p>
              <p>
                We work hard every day to give you an honest, true, effective
                CBD supplement so we can relieve the awful pain, inflammation,
                anxiety, sleep issues you and your family deal with every day.
              </p>
              <p>
                All our products are pure hemp plant extracts and the hemp
                plants we get our CBS from are
              </p>
              <br />
              <ul>
                <li>GMO Free</li>
                <li>Gluten Free</li>
                <li>THC Free</li>
                <li>Pesticide Free</li>
                <li>Hormone Free</li>
              </ul>
            </div>
          </div>
          <hr />
          <div className="pb-2 pt-2">
            <h3 className="pb-2">What dosage is right for me?</h3>
            <div className="pl-3 pr-3">
              <p>
                HOW you take CBD is as important as WHAT you take. We all have
                endocannabinoid receptors throughout our entire bodies that are
                present from birth to death. These molecules function much like
                CBD and cannabis in regulating mood, pain relief, and many other
                functions. But as with most functions in our bodies, they break
                down as we age. Most importantly everybody’s endocannabinoid
                system is different, the dosage of CBD oil can vary. Some may
                find relief with 3mg twice a day, while others felt better with
                200mg of CBD four times a day or even higher.
              </p>
              <p>
                Correct dosage could be tricky: The best way to identify proper
                dosage for you, start low and slow and keep adjusting. If you
                are new to cannabis, try dosing at 5mg to maintain relief. To
                take multiple doses during the first day, keep it 10 mg per dose
                and monitor any changes in your body. Experienced cannabis users
                can start at a higher dose, like 25 mg and adjust from there.
                CBD dosing experiments have shown that small dosages of CBD has
                an <b>“Active”</b> effect, which means that it actually helps
                you stay active and focused. Interestingly, large dosages have
                the opposite effect: a sedative effect. More research shows what
                is the optimal dosage to take for the anti-anxiety and
                antidepressant effects to be optimal, but it’s something one can
                also experiment with to find the dosage that suits them best.
                Keeping these factors in mind, it is imperative that the dosing
                model to be used be highly, individualized, determined in
                consultation with the patient and self-titrated. Whether
                ingesting oils or capsules, using a skin cream or edible item,
                the general guideline is to start with a low dose, gauge the
                effects and go slowly.
              </p>
            </div>
          </div>
          <hr />
          <div className="pb-2 pt-2">
            <h3 className="pb-2">What all forms can be CBD consumed</h3>
            <br />
            <div className="pl-3 pr-3">
              <p>Inhalation</p>
              <p className="pb-2">
                You can inhale the vapors using a specialized vape pen. This is
                the fastest acting delivery of CBD, and probably the easiest
                once you have your pen and cartridge. Don’t smoke it — that
                wrecks your throat and lungs like cigarettes do. If you’re a
                newbie, start slow. Some people can have an unpleasant reaction
                to the vapor.
              </p>
              <p>Ingestion</p>
              <p className="pb-2">
                To ingest CBD, take it right out of the dropper, in capsule
                form, or made into gums, candies, or baked goods. Compared to
                inhalation, it takes a bit longer to take effect.
              </p>
              <p>Sublingual</p>
              <p className="pb-2">
                You can drop the oil right under the tongue, or place a lozenge
                under the tongue. Sublingual delivery takes about as long as
                ingestion to take effect.
              </p>
              <p>Transdermal</p>
              <p>
                CBD can cross the skin and go into the bloodstream. A benefit to
                this method is that you can rub CBD infused oil or salves right
                onto the affected area.
              </p>
              <p>
                So, is CBD for you? Only you can decide, and with so many
                variables, it’s best to bring your functional medicine doctor in
                on this one. So far, the science says it’s not harmful, it’s not
                addictive, and it has the potential to have positive effects on
                a laundry list of ails. But, it’s illegal in a lot of places,
                for reasons that have little to nothing to do with protecting
                the public. Biohacking is all about taking the information
                that’s available to you and making your choices from there.
              </p>
              <br />
              <p>
                You can also refer the section on <br />
                <b>
                  How to take CBD oil Drops and how to take CBD Capsules in the
                  detailed reference section of this FAQ page
                </b>
              </p>
            </div>
          </div>
          <hr />
          <div className="pb-2 pt-2">
            <h3 className="pb-2">
              Is it important to take a medical physician’s advice to start
              taking CBD for my health recovery?
            </h3>
            <div className="pl-3 pr-3">
              <p>
                Well, if you ask yes it is… WHY? The market today is loaded with
                charlatans and weirdoes and fraud that in the name of genuine
                products are selling all chemical based false product claiming
                quality CBD products. Also we believe that every individual is
                unique and so are his needs and requirements. The market is
                flooded with brands and companies with different CBD products
                oils, capsules, tinctures, and many more. To decide the product,
                the right dosage, for how long, to heal your ailment requires an
                experts personalized advice. We have talked to many people who
                have been taking CBD products for quite a while now, but they
                have not got much benefit from it. It is not that this
                miraculous product is any lesser, or is at fault. But the CBD
                product that you bought for your health issue might not be the
                right one in first place, and more importantly you don’t weather
                the brand you chose to cure yourself is using the genuine hemp
                extract for the CBD products. There are several delivery
                methods, and some applications are better than others for
                certain issues they seek to get relived from. Dosing depends on
                age, weight, your past medical history, and what you’re trying
                to achieve with it, so it’s best to consult a functional
                medicine doctor to determine the right CBD products and the
                dosage for medical condition.
              </p>
              <p>
                We at CBD Bené provide that. The licensed medical physician
                associated with CBD been are the best in the industry, you can
                have an online one on one consultation with them to know the
                best CBD formulation suitable for you which can give best and
                quick results for your issue. For more details please check our
                TeleHealth section on the website.
              </p>
            </div>
          </div>
        </div>
        <div className="container-extend pt-5 pb-5">
          <div className="text-center">
            <h2 className="pb-5">Detailed FAQ Reference Section</h2>
          </div>
          <div className="pb-2 pt-2">
            <h3 className="pb-2">How to take CBD Oil Drops?</h3>
            <ul>
              <li>
                The key to taking CBD Oil drops is to start out one drop at a
                time. And just as importantly, CBD Oil must be taken under the
                tongue and held there for 30 seconds. Why? Sublingual dosing is
                the fastest way for the active ingredients to absorb into the
                tiny blood vessels under the tongue. The CBD gets into your
                bloodstream within an average of 10-15 minutes, higher than all
                other methods of ingestion (such as capsules, crystals, or
                salves). Because of the high rate of absorption, this means that
                sublingual dosing is also the most cost-effective way to take
                CBD.
              </li>
            </ul>
          </div>
          <div className="pb-2 pt-2">
            <h3 className="pb-2">How to take CBD Capsules:</h3>
            <ul>
              <li>
                CBD Capsules are for customers who prefer the convenience of
                swallowing their dose. It could be an issue of taste, a concern
                about precision, or a matter of convenience, such as taking it
                daily with a morning vitamin. It’s a familiar delivery system
                for many of our customers. Remember, ingesting CBD in capsule
                form takes as long as 45 minutes to take effect. For some
                people, this is beneficial in terms of timing.
              </li>
              <li>
                Our products are pharmacist formulated and of quality potency.
                Knowing that, most of our first time customers start with the
                300mg drops. The interesting thing about CBD is that the lower
                dosages typically help for issues such as lack of focus. The
                slightly higher doses help with issues such as anxiety. The
                highest doses help with sleep issues.
              </li>
              <li>
                Here’s an example: Someone who is new to CBD Oil may need help
                with insomnia. They may discover that a drop of CbdBené 1500mg
                Oil has no effect. So they try a drop or two more each night
                until they find that 6 drops is the dosage that helps them get
                to sleep.
              </li>
              <li>
                Another example could be someone who tries CbdBené 300mg Oil for
                anxiety. They may find that three drops is exactly what they
                need in order to calm down in the morning, but only two drops of
                the same oil is needed at noon to obtain the same effects.
              </li>
              <li>
                Bené also recognizes the importance of calibrated droppers for
                precision dosing. Please read all instructions on your product
                carefully and remember: one drop at a time.
              </li>
              <li>
                The capillairies under the tongue help carry the CBD oil into
                our bloodstream within 10-15 minutes.
              </li>
              <li>
                However, CBD in beverages, edibles and capsules can take about
                45 minutes to have an effect.
              </li>
            </ul>
          </div>
          {/* <div className="pb-2 pt-2">
                    <h3 className="pb-2">asdf</h3>
                </div>
                <hr/> */}
        </div>
      </div>
    );
  }
}
