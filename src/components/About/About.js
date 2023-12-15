import './About.css';
import about1 from '../../images/about1.jpg';
import about2 from '../../images/about2.jpg';
function About() {
    return (
        <section className='about__container'>
            <h1 className='about__title'>О нас</h1>
            <p className='about__subtitle'>Кто мы и почему мы делаем то, что делаем!</p>
            <p className='about__depiction'>Вы доверяете нам самые важные этапы вашей жизни. C нами вы признаётесь в любви и делаете предложение, на которое всегда отвечают “Да”. С нами вы создаёте крепкую семью, обмениваясь клятвами верности. С нами вы радуете своих женщин и дочерей, оставляя им своё сердце. С нами вы закрепляете дружбу навек и создаёте традиции.</p>
            <h2>Топ трендов</h2>
            <img src={about1} alt='бусы'/>
            <p className='about__depiction'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam placerat, augue a volutpat hendrerit, sapien tortor faucibus augue, a maximus elit ex vitae libero. Sed quis mauris eget arcu facilisis consequat sed eu felis. </p>
            <ul>
                <li className='about__depiction-item'>consectetur adipiscing elit. Aliquam placerat</li>
                <li className='about__depiction-item'>Lorem ipsum dolor sit amet consectetur </li>
            </ul>
            <h2>Сделано с любовью</h2>
            <img src={about2} alt='часы'/>
            <p className='about__depiction'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam placerat, augue a volutpat hendrerit, sapien tortor faucibus augue, a maximus elit ex vitae libero. Sed quis mauris eget arcu facilisis consequat sed eu felis. Nunc sed porta augue. Morbi porta tempor odio, in molestie diam bibendu.
            </p>
        </section>
    )
}

export default About