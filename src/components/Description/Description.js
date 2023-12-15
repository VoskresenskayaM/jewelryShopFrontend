import './Description.css';

function Description({ description }) {
    return (
        <p className='description__container'>
            {description}
        </p>
    )
}

export default Description