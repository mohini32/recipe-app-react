import React from 'react'
import { useEffect, useState } from 'react'
import { fetchData } from '../Service'
import { BsSearch } from 'react-icons/bs'
const RecipeLists = (props) => {
    const [searchedTerm, setSearchedTerm] = useState('')
    const [query, setQuery] = useState('pizza')
    const [data, setData] = useState('');

const searchrecipe=(searchQuery)=>{
    fetchData(searchQuery).then((response) => {
        setData(response)
        console.log(response);
        props.setLoader(false)
        console.log(response);
    })
}

    useEffect(() => {
        fetchData(query).then((response) => {
            setData(response)
            console.log(response);
            props.setLoader(false)
        })



    }, [])

    return (
        <div>
            <div className='container'>
            <div className='heading-line'>
                <strong>Search Recipes</strong>
                <div className='input-wrapper' >
                    <input onChange={(e)=>setSearchedTerm(e.target.value)} 
                    value={searchedTerm}
                    type="text" placeholder='Search' />
                    <button onClick={()=>(searchrecipe(searchedTerm),props.setLoader(true))}><BsSearch /></button>
                </div>
            </div>
            <div className='flexbox'>
                
                
                    {
                        data && data.hits.map((item,index) => (
                            <div key={index} className='flexItem'>
                                <div className='img-wrapper'>
                                    <img src={item.recipe.image} alt={item.recipe.label}/>
                                </div>
                                <p>{item.recipe.label}</p>
                            </div>
                        ))
                    }
                     
            </div>
        </div>
        </div>
    )
}

export default RecipeLists