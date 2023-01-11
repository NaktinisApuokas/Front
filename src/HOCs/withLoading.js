import React from "react";

export default function withLoading(Component) {
    return function WithLoadingComponent(props) {
        if(props.isLoading){
            return <div className="mb-3 p-5 text-center bg-light">Loading...</div>;
        }

        return <Component {...props} />;
    }
}