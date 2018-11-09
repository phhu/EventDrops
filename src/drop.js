import uniqBy from 'lodash.uniqby';
import groupBy from 'lodash.groupby';

const overlappingDropIdentity = data => Math.round(xScale(dropDate(data)));

const filterOverlappingDrop = (xScale, dropDate) => d =>
    uniqBy(d.data, data => xScale(dropDate(data)));

const groupOverlappingDrop = (xScale, dropDate) => d =>
    Object.values(
        groupBy(d.data, data => Math.round(xScale(dropDate(data))))
    ).reduce((acc, i) => {
        i.sort((a, b) => dropDate(a) - dropDate(b));
        i[0]['_allEvents'] = i;
        return acc.concat(i[0]);
    }, []);

export default (config, xScale) => selection => {
    const {
        drop: {
            color: dropColor,
            radius: dropRadius,
            date: dropDate,
            onClick,
            onMouseOver,
            onMouseOut,
        },
    } = config;

    const drops = selection
        .selectAll('.drop')
        //.data(filterOverlappingDrop(xScale, dropDate));
        .data(groupOverlappingDrop(xScale, dropDate));

    drops
        .enter()
        .append('ellipse')
        .classed('drop', true)
        .attr('ry', dropRadius)
        .attr('rx', 5)
        .attr('fill', dropColor)
        .on('click', onClick)
        .on('mouseover', onMouseOver)
        .on('mouseout', onMouseOut)
        .merge(drops)
        .attr('cx', d => xScale(dropDate(d)));

    drops
        .attr('ry', dropRadius)
        .attr('rx', 5)
        .attr('fill', dropColor);

    drops
        .exit()
        .on('click', null)
        .on('mouseover', null)
        .on('mouseout', null)
        .remove();
};
