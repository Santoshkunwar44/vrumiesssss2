import React from 'react'
import { Link } from 'react-router-dom'
import styles from "./category.module.css"


const CatItem = ({ catItem, currentFocus }) => {
  return (

    <> <Link className={`${currentFocus ? styles.currentLink : ""} ${styles.catItemLink}`} state={{ data: catItem }} to={`/category/${catItem?.displayName}`}>
      <div className={`${styles.categoryItem} ${currentFocus ? styles.activeItem : ""}`}>
        <div className={`${styles.catItemContent}`}>
          <img className={styles.catMainImg} src={catItem?.img} alt="events" />
          <p style={{ fontSize: "10px" }}>  {catItem?.name} </p>
        </div>
      </div>
    </Link>
    </>
  )
}

export default CatItem