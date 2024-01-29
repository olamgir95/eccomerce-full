import React, { useEffect } from "react";
import "./banner.css";

const ShopBanner = () => {
  useEffect(() => {
    const accordionItems = document.querySelectorAll("#accordion > li");

    accordionItems.forEach((item) => {
      if (window.innerWidth > 767) {
        item?.addEventListener("mouseenter", handleAccordion);
      } else {
        item?.addEventListener("touchstart", handleAccordion);
      }
    });

    return () => {
      accordionItems.forEach((item) => {
        item.removeEventListener("mouseenter", handleAccordion);
      });
    };
  }, []);

  const handleAccordion = (e: Event): void => {
    e.stopPropagation();
    const item = e.currentTarget as HTMLElement;

    if (item.classList.contains("out")) {
      item.classList.add("out");
    } else {
      item.classList.add("out");
      Array.from(item.parentNode!.children).forEach((sibling) => {
        if (sibling !== item) {
          sibling.classList.remove("out");
        }
      });
    }
  };

  return (
    <div
      className="site-outer"
      data-aos="flip-left"
      data-aos-easing="ease-out-cubic"
      data-aos-duration="2000"
    >
      <div className="site-inner">
        <section className="container-fluid">
          <div className="row">
            <ul className="accordion-group" id="accordion">
              <li
                style={{
                  backgroundImage: `url(
                    "https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80"
                  )`,
                }}
              >
                <div className="accordion-overlay"></div>
                <h3>Rustic</h3>
                <section className="hidden-xs">
                  <article>
                    <p>Rual and rustic</p>
                  </article>
                </section>
              </li>
              <li
                className="out"
                style={{
                  backgroundImage: `url(
                    "https://images.unsplash.com/photo-1484154218962-a197022b5858?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1953&q=80"
                  )`,
                }}
              >
                <div className="accordion-overlay"></div>
                <h3>Clean</h3>
                <section className="hidden-xs">
                  <article>
                    <p>For the single or couple</p>
                  </article>
                </section>
              </li>
              <li
                style={{
                  backgroundImage: `url(
                    "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1955&q=80"
                  )`,
                }}
              >
                <div className="accordion-overlay"></div>
                <h3>Stylish</h3>
                <section className="hidden-xs">
                  <article>
                    <p>When people want it cosy but stylish</p>
                  </article>
                </section>
              </li>
              <li
                style={{
                  backgroundImage: `url(
                    "https://images.unsplash.com/photo-1495433324511-bf8e92934d90?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80"
                  )`,
                }}
              >
                <div className="accordion-overlay"></div>
                <h3>Family</h3>
                <section className="hidden-xs">
                  <article>
                    <p>For the family dinner</p>
                  </article>
                </section>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ShopBanner;
