import uniqBy from 'lodash.uniqby';
import groupBy from 'lodash.groupby';

const overlappingDropIdentity = data => Math.round(xScale(dropDate(data)));
const filterOverlappingDrop = (xScale, dropDate) => d =>
    uniqBy(d.data, overlappingDropIdentity);

const groupOverlappingDrop = (xScale, dropDate) => d =>
    groupBy(d.data, overlappingDropIdentity)
    .reduce( (acc,i) => (i[0]['_allEvents'] = i,acc.concat(i[0])), [] );

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
        .append('circle')
        .classed('drop', true)
        .attr('r', dropRadius)
        .attr('fill', dropColor)
        .on('click', onClick)
        .on('mouseover', onMouseOver)
        .on('mouseout', onMouseOut)
        .merge(drops)
        .attr('cx', d => xScale(dropDate(d)));

    drops
        .exit()
        .on('click', null)
        .on('mouseover', null)
        .on('mouseout', null)
        .remove();
};
