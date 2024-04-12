import {Link} from 'react-router-dom';

export const ItemList = ({products})=>{
    //console.log(products)

    return(       
        <>
        {products.map((item) => (
                                    <div key={item.id} className="col">
                                    <div className="card shadow-sm">
                                    <img src={item.pictureurl} className="dimension card-img-top bg-dark cover" alt="..."/>
                                    
                                      <div className="card-body">
                                        <h5 className="card-title text-center">{item.tittle}</h5>
                                        <p className="card-text text-center text-muted">${item.price}</p>
                                        <div className="d-grid gap-2">
                  
                                            <Link to={"/productos/"+item.id} className="btn btn-outline-dark" replace>
                                              Detail
                                            </Link>
                       
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                ))}
        </>
    )
}