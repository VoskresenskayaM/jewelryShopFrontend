import './DotNavigation.css'

function DotNavigation({ isSelected }) {
   
    const dotnav = isSelected ? 'dotnavigation' : 'dotnavigation_activ'
    return (
        <div className={dotnav}></div>
    )
}
export default DotNavigation