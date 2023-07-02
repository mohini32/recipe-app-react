import React from 'react'
import { CiPizza } from 'react-icons/ci'
import { GiFruitBowl, GiCheckMark, GiNoodles } from 'react-icons/gi'
import { MdOutlineIcecream } from 'react-icons/md'
import { useState, useEffect } from 'react'
import { fetchTabData } from '../Service'
function Tabs(props) {
    const [active, setActive] = useState('pizza')
    const [tabData, setTabData] = useState('')
    const [tabLabel, setTabLabel] = useState([
        {
            name: 'pizza',
            icons: <CiPizza />,
            id: '0209cb28fc05320434e2916988f47b71'
        },
        {
            name: 'FruitBowl',
            icons: <GiFruitBowl />,
            id: '705445746cc36db0166baae7ee8a656b'
        },
        {
            name: 'Icecream',
            icons: <MdOutlineIcecream />,
            id: '7cb8526742640218d65ae2aa7544eb31'
        },
        {
            name: 'Noodles',
            icons: <GiNoodles />,
            id: 'a243e3cd56da95b31e5a86ef52578908'
        },
    ])
    const handleClick = (name, id) => {
        setActive(name)
        fetchTabData(id).then((response) => {
            setTabData(response);
            props.setLoader(false)
        })
    }


    useEffect(()=> {
        fetchTabData(tabLabel[0].id).then((response)=> {
            setTabData(response);
            props.setLoader(false)
        })
    },[])

    return (
        <div className="container">
            <h1 className='recipeHeading'>What would you like to have!</h1>
            <div className="tabs">
                {tabLabel.map((item, index) => (
                    <div onClick={() => (handleClick(item.name, item.id),props.setLoader(true))} key={index} className={`tablist ${active === item.name ? 'active' : ""}`}>
                        {item.icons}
                        <span>{item.name}</span>
                    </div>
                ))}


            </div>
            <div className='recipe_banner'>
            {tabData !== '' && tabData.recipe &&  <>
                <div className="left-col">
                    <span className='badge'>{tabData.recipe?.cuisineType[0].toUpperCase()}</span>
                    {tabData.recipe.label && <h1>{tabData.recipe.label}</h1>}                    <p><strong>Recipe by:</strong><small>{tabData.recipe.source}</small></p>
                    <h3>Ingredients</h3>
                    <div className='ingredients'>
                        <ul>
                            {tabData.recipe.ingredientLines.map((list,index)=> 
                                (<li key={index}><GiCheckMark size="18px" color="#6fcb9f" />&nbsp;<span>{list}</span></li>)
                            )}
                            
                        </ul>
                    </div>
                </div>
                <div className="right-col">
                    <div className="image-wrapper">
                    <img src={tabData.recipe.image} alt={tabData.recipe.label} />
                    </div>
                </div>
            </>}
            </div>
        </div>
    )
}

export default Tabs