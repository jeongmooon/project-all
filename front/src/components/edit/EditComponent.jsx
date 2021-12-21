import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import styled from "styled-components";
import EditImage from "../common/image/EditImage";

const EditorWrap = styled.div`
  padding-top: 2rem;
`;

const TitleInput = styled.input`
  font-size: 1.5rem;
  font-weight: bolder;
  outline: none;
  padding-bottom: 0.5rem;
  border: none;
  border-bottom: 1px solid grey;
  margin-bottom: 2rem;
  width: 100%;
  box-sizing: border-box;
  text-align: center;
`;

const NumberInput = styled.input`
  font-size: 1.5rem;
  font-weight: bolder;
  outline: none;
  padding-bottom: 0.5rem;
  border: none;
  border-bottom: 1px solid grey;
  margin-bottom: 2rem;
  width: 50%;
  box-sizing: border-box;
  text-align: center;
`;

const QuillWrapper = styled.div`
  .ql-editor {
    padding: 1rem 0;
    text-indent: 1rem;
    min-height: 32rem;
  }
`;

const EditComponent = ({ onChangeField, imgURL, onChangeImage, editInfo }) => {
  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image"],
      [{ align: [] }, { color: [] }, { background: [] }],
      ["clean"],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "align",
    "color",
    "background",
  ];

  const onChangeTitle = (e) => {
    const { value } = e.target;
    onChangeField({ key: "coktailName", value });
  };

  const onChangCategory = (e) => {
    const { value } = e.target;
    onChangeField({ key: "category", value });
  };

  const onChangeSweet = (e) => {
    const { value } = e.target;
    onChangeField({ key: "sweet", value });
  };

  const onChangeSour = (e) => {
    const { value } = e.target;
    onChangeField({ key: "sour", value });
  };

  const onChangeBitter = (e) => {
    const { value } = e.target;
    onChangeField({ key: "bitter", value });
  };

  const onChangeAlcoholDegree = (e) => {
    const { value } = e.target;
    onChangeField({ key: "alcoholDegree", value });
  };

  const onChangeKind = (e) => {
    const { value } = e.target;
    onChangeField({ key: "kind", value });
  };

  const onChangeSauceKind = (e) => {
    const { value } = e.target;
    onChangeField({ key: "sauceKind", value });
  };

  const onChangePerifume = (e) => {
    const { value } = e.target;
    onChangeField({ key: "perifume", value });
  };

  const onChangeBody = (cocktailContent) => {
    onChangeField({ key: "cocktailContent", value: cocktailContent });
  };

  return (
    <EditorWrap>
      <TitleInput
        value={editInfo.coktailName}
        onChange={onChangeTitle}
        placeholder="coktailName"
      />
      <TitleInput
        value={editInfo.category}
        onChange={onChangCategory}
        placeholder="category 1~ 4"
      />
      <NumberInput
        value={editInfo.sweet}
        onChange={onChangeSweet}
        placeholder="sweet 1 ~ 10"
      />
      <NumberInput
        value={editInfo.sour}
        onChange={onChangeSour}
        placeholder="sour 1 ~ 10"
      />
      <NumberInput
        value={editInfo.bitter}
        onChange={onChangeBitter}
        placeholder="bitter 1~ 10"
      />
      <NumberInput
        value={editInfo.alcoholDegree}
        onChange={onChangeAlcoholDegree}
        placeholder="alcoholDegree 1 ~ 100"
      />
      <TitleInput
        value={editInfo.Kind}
        onChange={onChangeKind}
        placeholder="kind array"
      />
      <TitleInput
        value={editInfo.sauceKind}
        onChange={onChangeSauceKind}
        placeholder="saucekind array"
      />
      <TitleInput
        value={editInfo.perifume}
        onChange={onChangePerifume}
        placeholder="perifume array"
      />
      <QuillWrapper>
        <ReactQuill
          theme="snow"
          modules={modules}
          formoats={formats}
          value={editInfo.cocktailContent}
          onChange={(content, delta, source, editor) => {
            if (source === "user") {
              onChangeBody(editor.getHTML());
            }
          }}
        />
      </QuillWrapper>
      <EditImage imgURL={imgURL} onChangeImage={onChangeImage} />
    </EditorWrap>
  );
};

export default EditComponent;
