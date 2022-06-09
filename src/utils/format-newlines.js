export const formatNewlines = str => {
  if (typeof str !== "string") return ""
  const paras = str.split("\n\n")
  const formattedParas = paras.map(para => para.replace(/\n/g, "<br/>"))

  return `<p>${formattedParas.join("</p><p>")}</p>`
}
