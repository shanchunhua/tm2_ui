export const putSupplier = makeAction('PUT_SUPPLIER')

function makeAction (type) {
  return ({ dispatch }, ...args) => dispatch(type, ...args)
}
