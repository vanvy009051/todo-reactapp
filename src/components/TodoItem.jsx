import PropTypes from 'prop-types'
import tick from '../assets/tick.png'
import not_tick from '../assets/not_tick.png'
import delete_icon from '../assets/delete.png'

const TodoItem = ({ text, id, isCompleted, deleteTodo, toggle }) => {
  return (
    <div className='flex items-center my-3 gap-2'>
      <div onClick={() => toggle(id)} className='flex flex-1 items-center cursor-pointer'>
        <img src={isCompleted ? tick : not_tick} alt='' className='w-7 h-7' />
        <p className={`text-slate-700 ml-4 text-[17px] decoration-slate-500 ${isCompleted ? 'line-through' : ''}`}>{text}</p>
      </div>
      <img onClick={()=> deleteTodo(id)} src={delete_icon} alt='' className='w-3.5 cursor-pointer' />
    </div>
  )
}

TodoItem.propTypes = {
  text: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  isCompleted: PropTypes.bool,
  deleteTodo: PropTypes.func,
  toggle: PropTypes.func,
}

export default TodoItem
