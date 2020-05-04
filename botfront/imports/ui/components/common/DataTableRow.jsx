import React from 'react';
import PropTypes from 'prop-types';

const Row = React.forwardRef((props, ref) => {
    const {
        index, rowClassName, style, onClick, onMouseDown, onMouseEnter, isDataLoaded, columns, datum,
    } = props;

    const rowInfo = { index, datum };

    if (!isDataLoaded) {
        return (
            <div ref={ref} style={style}>
                <div className={`row ${rowClassName}`}>
                    Loading...
                </div>
            </div>
        );
    }
    return (
        <div
            ref={ref}
            style={style}
            data-index={index}
            role='button'
            tabIndex={0}
            onKeyDown={null}
            {...(onClick ? { onClick: () => onClick(rowInfo) } : {})}
            {...(onMouseDown ? { onMouseDown: ({ nativeEvent: { shiftKey, metaKey, ctrlKey } }) => onMouseDown({ shiftKey, metaKey: metaKey || ctrlKey, ...rowInfo }) } : {})}
            {...(onMouseEnter ? { onMouseEnter: () => onMouseEnter(rowInfo) } : {})}
            className='row-wrapper'
        >
            <div className={`row ${rowClassName}`}>
                {columns.map(c => (
                    <div key={c.key} className={`item ${c.class || ''}`} style={c.style}>
                        {c.render
                            ? c.render(rowInfo)
                            : datum[c.key]
                        }
                    </div>
                ))}
            </div>
        </div>
    );
});

Row.propTypes = {
    index: PropTypes.number,
    datum: PropTypes.object,
    style: PropTypes.object,
    rowClassName: PropTypes.string,
    onClick: PropTypes.func,
    onMouseDown: PropTypes.func,
    onMouseEnter: PropTypes.func,
    isDataLoaded: PropTypes.bool,
    columns: PropTypes.array.isRequired,
};

Row.defaultProps = {
    index: null,
    datum: null,
    style: {},
    rowClassName: '',
    onClick: null,
    onMouseDown: null,
    onMouseEnter: null,
    isDataLoaded: true,
};

export default Row;
