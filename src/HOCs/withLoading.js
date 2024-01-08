import React from "react";
import styles from '../css/styles.module.css';

export default function withLoading(Component) {
    return function WithLoadingComponent(props) {
        if(props.isLoading){
            return <div className={styles.BackGroundColor}>Loading...</div>;
        }

        return <Component {...props} />;
    }
}