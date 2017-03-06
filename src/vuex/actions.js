export const putSupplier = makeAction('PUT_SUPPLIER')
export const putStore = makeAction('PUT_STORE')

function makeAction (type) {
  return ({ dispatch }, ...args) => dispatch(type, ...args)
}
