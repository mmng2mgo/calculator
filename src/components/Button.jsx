import React from 'react';

export function Button({ value, handle }){
    return(
        <button onClick={() => handle(value)}>
            {value}
        </button>
    );
}
