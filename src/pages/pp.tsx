import React, { useState, useCallback } from "react"
import Layout from "../layouts"
import { Document, Page, pdfjs } from "react-pdf"
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`

const PP = () => {
  const [numPages, setNumPages] = useState<number>(0)
  const [pageNumber, setPageNumber] = useState(1)
  const [ref, setRef] = useState<any>(React.createRef())

  const PrivacyPolicyPDF = require("../pdf/pp.pdf")

  const onRefChange = useCallback((node) => {
    alert("test")
    // ref value changed to node
    setRef(node) // e.g. change ref state to trigger re-render
    ref.current.style.margin = "auto auto"
    if (node === null) {
      // node is null, if DOM node of ref had been unmounted before
    } else {
      // ref value exists
    }
  }, [])

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages)
    setPageNumber(1)
  }

  function changePage(offset: number) {
    setPageNumber((prevPageNumber) => prevPageNumber + offset)
  }

  function previousPage() {
    changePage(-1)
  }

  function nextPage() {
    changePage(1)
  }

  return (
    <Layout>
      <div className="grid grid-cols-3 mt-32 mb-8">
        <button type="button" disabled={pageNumber <= 1} onClick={previousPage}>
          Previous
        </button>
        <div className="mx-auto text-center">
          Page {pageNumber || (numPages ? 1 : "--")} of {numPages || "--"}
        </div>
        <button
          type="button"
          disabled={pageNumber >= numPages}
          onClick={nextPage}
        >
          Next
        </button>
      </div>
      <div className="mx-auto" style={{ width: "38rem" }}>
        <Document
          file={PrivacyPolicyPDF}
          className="mx-auto"
          onLoadSuccess={onDocumentLoadSuccess}
          canvasRef={ref}
        >
          <Page className={"mx-auto"} pageNumber={pageNumber} />
        </Document>
      </div>
    </Layout>
  )
}

export default PP
