import './AddCount.css';


function AddCount({count, hendleCountPlus, hendleCountMinus}){

    return(
                  <div className='product__count-block'>
                        <button className='product__count-button  product__count-button_left' onClick={hendleCountPlus}>+</button>
                        <div className='product__count'>{count}</div>
                        <button className='product__count-button  product__count-button_rigth' onClick={hendleCountMinus}>-</button>
                    </div>
    )
}

export default AddCount