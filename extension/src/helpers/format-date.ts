// output: yyyy-mm-dd
export const formatDate = (date: Date) => date.toISOString().split("T")[0]
