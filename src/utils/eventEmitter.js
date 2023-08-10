import EventEmitter from 'events'

const eventEmitter = new EventEmitter()

//turn off the limit of eventEmitter
eventEmitter.setMaxListeners(0)

export default eventEmitter


/*
 * How to use it?
 * React.useEffect(() => {
    eventEmitter.addListener('createExportTodosRequest', handlecreateExportTodosRequest)
    return () => {
      eventEmitter.removeListener('createExportTodosRequest', handlecreateExportTodosRequest)
    }
  }, [])
  *
  * Call it?
  * eventEmitter.emit('createExportTodosRequest', selectedTodoIds)
 */