import 'braft-editor/dist/index.css';
import React, { PureComponent, FormEvent } from 'react';
import BraftEditor, { BuiltInControlType } from 'braft-editor';
import { Card, Form, Input, Button } from 'antd';
import styles from './index.less';

const FormItem = Form.Item;

// @ts-ignore
@Form.create()
class EditorIndex extends PureComponent<any> {
  componentDidMount() {
    // 异步设置编辑器内容
    setTimeout(() => {
      const { form } = this.props;
      form &&
        form.setFieldsValue({
          content: BraftEditor.createEditorState('<p>Hello <b>World!</b></p>'),
        });
    }, 1000);
  }

  handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const { form } = this.props;
    form &&
      form.validateFields((error: any, values: any) => {
        if (!error) {
          const submitData = {
            title: values.title,
            content: values.content.toRAW(), // or values.content.toHTML()
          };
          console.log(submitData);
        }
      });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const controls: BuiltInControlType[] = [
      'bold',
      'italic',
      'underline',
      'text-color',
      'separator',
      'link',
      'separator',
      'media',
    ];

    return (
      <Card>
        <Form onSubmit={this.handleSubmit}>
          <FormItem label="文章标题">
            {getFieldDecorator &&
              getFieldDecorator('title', {
                rules: [
                  {
                    required: true,
                    message: '请输入标题',
                  },
                ],
              })(<Input size="large" placeholder="请输入标题" />)}
          </FormItem>
          <FormItem label="文章正文">
            {getFieldDecorator('content', {
              validateTrigger: 'onBlur',
              rules: [
                {
                  required: true,
                  validator: (_: any, value: any, callback: Function) => {
                    if (value.isEmpty()) {
                      callback('请输入正文内容');
                    } else {
                      callback();
                    }
                  },
                },
              ],
            })(
              <BraftEditor
                className={styles.editor}
                controls={controls}
                placeholder="请输入正文内容"
              />,
            )}
          </FormItem>
          <FormItem>
            <Button size="large" type="primary" htmlType="submit">
              提交
            </Button>
          </FormItem>
        </Form>
      </Card>
    );
  }
}
export default EditorIndex;
