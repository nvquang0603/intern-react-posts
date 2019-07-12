import React from 'react';
export default function ActiveMark(active = true) {
    return (
        active.active === true ? <i className="fas fa-check text-success"/> : <i className="fas fa-ban text-danger" />
    )
}
