import React, {Component} from 'react';
import "./css/restaurant.css"
import {db} from "../../firebase";
function Welcome(props) {
    return (
        <div className='body'>
        <h1 className="title justify-content-center text-center text-black">{props.title}</h1>
        <div className="row res_photo_grid1" id='forStayAddImage' >
        {props.gallContent.map(image => {
              
              return image 
            })}
        </div> 
        </div>
        )
    
    }
class Confe extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          headerImage:'',
            headerText: '',
          showTitle: '',
          headerAddText:'',
          gallery:[],
          add:[],
          price:[],
        //   data: [],
        //   allCard:[],
        };
      }
      
      componentDidMount() {
        db.collection("Uslugi")
        .doc('confer')
        .get()
        .then(doc => {
            var data = doc.data();
            this.setState({ headerImage: data.headerImage})
            this.setState({ headerText: data.headerText})
            this.setState({ showTitle: data.headerTitle})

            this.setState({ headerAddText: data.headerAddText})
            
            var getPrice = doc.data();
            data =  data['gallery'];
            
            var len = 0;
            for (var count in data) {
                len++;
            }
            var galArr=[];
            console.log(data)
            for(var i = 0 ; i<len;i++){
                var toGo =   <img className="col-sm-12 col-md-12 col-lg-12 col-xl-3 center"
                src={data[i]}/> 
                galArr.push(toGo)
            
            }
            this.setState({ gallery: galArr})
            
               // getPRice
            
            getPrice = getPrice['price'];
            var  cardPrice=[];
            var leng = 0;
            for (var counts in getPrice) {
                leng++;
            }
            if(leng!=0){
             for(var p = 0;p<leng;p++){
                  var textP = getPrice[p].split('|');
                  cardPrice.push(<div className="col-sm-12 col-md-12 col-lg-12 col-xl-6 center">
                  <div className="justify-content-center">
                      <div className="d-flex justify-content-between">
                          <h1 className="pricename">{textP[0]}</h1>
                          <p></p>
                          <p className="price">{textP[1]}</p>
                          <p></p>
                      </div>
                      
                      <hr className="divider"/>
                  </div>
              </div>)
              }
              this.setState({ price: cardPrice})
            }
            else{
                 console.log('no money')
            }
         
        } 
        )
        db.collection("Uslugi")
        .doc('conferadd')
        .get()
        .then(doc => {
            var data = doc.data();
            
            var len = 0;
            for (var count in data) {
                len++;
            }
            var cardImage=[];
            var card=[];
            alert(len)
            if(len!=0){
             for(var i = 0;i<len;i++){
               
                
                  console.log(data["conferAdd"+i.toString()])
                  var lens = 0;
                  for (var counts in data['conferAdd'+i.toString()]['gallery']) {
                      lens++;
                  }
                  // var getImageCount = data['resAdd'+i.toString()]['gallery'];
                  
                  for(var s = 0 ; s<lens;s++){
                      cardImage.push(<img className="col-sm-12 col-md-12 col-lg-12 col-xl-3 center"
                      src={data['conferAdd'+i.toString()]['gallery'][s]}/>);
                  
                  }
                 
                  card.push(<Welcome  title={data['conferAdd'+i.toString()].title} gallContent={cardImage}/>);
                  // card.push(<Welcome name="Алиса" />)
              }
              this.setState({ add: card})
            }
            else{
                 console.log('noADD ban')
            }
           
            
            
            
         
            


        } 
        )
        
      }
    render() {
        return (
            <div id="page">
                <div className="image-head-wrapper" >
                    <img src={this.state.headerImage}/>
                    <h1>{this.state.headerText}</h1>
                </div>
                <div className="body">
                    <h1 className="title justify-content-center text-center text-black">{this.state.showTitle}</h1>
                    <div className="row res_photo_grid2">
                        {this.state.gallery}
                    </div>
                    <h1 className="title justify-content-center text-center text-black">Цена</h1>
                    <div className="container">
                        <div className="col-centered">
                            <div className="row">
                                <div className="col-sm-12 col-md-12 col-lg-12 col-xl-6 center">
                                {this.state.price}
                            </div>
                        </div>
                    </div>
                    </div>
                    <iframe
                        src="https://yandex.ru/map-widget/v1/?um=constructor%3Aadd452e1367bf757e79ab69c7ed36f85899022cbc98ecaf4012a025f6b9224bd&amp;source=constructor"
                        width="973" height="400" frameBorder="0"></iframe>
                </div>
                <a style={{display: 'none'}} href="javascript:void(0);" className="scrollTop back-to-top"
                   id="back-to-top">
                    <span><i aria-hidden="true" className="fa fa-angle-up fa-lg"/></span>
                    <span>Top</span>
                </a>
            </div>)

    }

}

export default Confe;