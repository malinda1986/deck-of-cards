import React from 'react'
import _ from 'lodash';
const List = ({items}) => {
  const leaders = _.orderBy(items, ['moves'],['asc']); 
  return (
    <div >
     <div className="lbl_lb">Leader board</div>
        <div className="playground">
          {leaders.map(({ name, moves, rank }, index) => {
            return (
                <div className="lbl_lb_text">
                # {index+1}  -   Name:  {name}, [Moves :{moves}]
                </div> 
            )
          })}
        </div>
    </div>
  )
}
export default List;