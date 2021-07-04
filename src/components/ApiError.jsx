export const ApiError = props => {
    const { loading } = props
  
    if (loading) {
      return <div>My error.</div>
    }
}