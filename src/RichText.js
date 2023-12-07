const { useEffect } = require("react");
const { useQuill } = require("react-quilljs");

const RichText = ({ value, onChange }) => {
  const { quill, quillRef } = useQuill();

  useEffect(() => {
    if (quill) {
      quill.on("text-change", () => {
        onChange(`${quill.root.innerHTML}`);
      });

      quill.clipboard.dangerouslyPasteHTML(value);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quill, onChange]);

  return (
    <div style={{ width: "100%", height: 300 }}>
      <div ref={quillRef} />
    </div>
  );
};

export default RichText;
