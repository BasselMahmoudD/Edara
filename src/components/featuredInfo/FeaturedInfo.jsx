import "../featuredInfo/featuredInfo.css"

export default function FeaturedInfo() {
  return (
    <div className="featured">
      <div className="featuredItem">
        <span className="featuredTitle">Warehouses</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">$5.55</span>
        </div>
        <span className="featuredSub">Compared to last month</span>         
      </div> 

      <div className="featuredItem">
        <span className="featuredTitle">supervisor</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">$6.66</span>
        </div>
        <span className="featuredSub">Compared to last month</span>         
      </div> 

      <div className="featuredItem">
        <span className="featuredTitle">product</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">$2.229</span>
        </div>
        <span className="featuredSub">Compared to last month</span>         
      </div> 
    </div>
  )
}
