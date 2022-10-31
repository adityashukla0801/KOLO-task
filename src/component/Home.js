import React, { useEffect } from 'react'
import { connect } from 'react-redux';
import { changePagination, onSearchInput, searchApiCall } from '../redux/action';
import Pagination from "react-js-pagination";


export const Home = (props) => {
  const {onSearchInput, searchApiCall, offset, changePagination, searchedValue, totalCount, characters} = props
  useEffect(() => {
    if(totalCount) {
      const payload = {
        searchedValue: searchedValue,
        offset: offset || 0
      }
      if(searchedValue?.trim()?.length) {
        searchApiCall(payload)
      }
    }
  }, [offset])
 const handleInput = (e) => {
  e.preventDefault()
   onSearchInput(e.target.value)
   const payload = {
     searchedValue: e.target.value,
     offset: offset || 0
   }
   if(e?.target?.value?.trim()?.length) {
     searchApiCall(payload)
   }
 }

 const handlePageChange = (pageNumber)=>{
   changePagination(pageNumber)

 }

    return (
      <div >
        <h1 className='text-white text-center' style={{background:'#032541' }}>MARVEL</h1>
        <div className='overlay text-center d-flex justify-content-center align-items-end' style={{height:'90vh'}}>
          <div  className='text-white py-5 display-3 '>
          <h1 style={{background:''}}>Welcome</h1>
          <p>Millions of MARVEL to discover. Explore now.</p>
          <div className="py-5 input-group mb-3 container">
            <input style={{borderRadius:'50px'}} type="text" className="form-control" placeholder="Search Movie......" aria-label="Recipient's username" aria-describedby="basic-addon2" value={props.inputValue}  onChange={handleInput}/>
          </div>
          </div>
        </div>
        
        <div className='container'>
        {props.totalCount ? (
            <Pagination
              activePage={props.activePage}
              itemsCountPerPage={props.limit}
              totalItemsCount={props.totalCount}
              pageRangeDisplayed={Math.ceil(props.totalCount/props.limit)}
              onChange={handlePageChange}
            />
          ) : null}
          <div className='row'>
        {characters?.map(ele=>{
      return(
       <div className='col-sm'>
          <div key={ele.id}  className="card my-4 " style={{width: "18rem"}}>
          <img src={ele.thumbnail.path == null?('default.png'):(ele.thumbnail.path +'.' + ele.thumbnail.extension)} className="card-img-top "  style={{width: "18rem",height:"30rem"}}></img>
            <div className="card-body bg-secondary">
              <h4 className="card-title">{ele.name}</h4>
                  <p className="card-text"><b>Description:- </b>{ele.description}</p>
                  
            </div>
          </div>
        </div>
      )
    })
    } 
      </div>
    </div>
  </div>
    )
}

const mapStateToProps = (state) => ({
  inputValue: state?.searchedValue,
  characters: state?.characters,
  limit: state?.limit,
  offset: state?.offset,
  totalCount: state?.totalCount,
  activePage: state?.activePage,
  searchedValue: state?.searchedValue
})

const mapDispatchToProps = {
  onSearchInput: onSearchInput,
  changePagination: changePagination,
  searchApiCall: searchApiCall
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
