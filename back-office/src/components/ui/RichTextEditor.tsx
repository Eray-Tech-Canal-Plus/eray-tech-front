import { Bold, Italic, Underline, List, ListOrdered, Quote, Heading2, Link as LinkIcon } from 'lucide-react';
import { useRef } from 'react';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function RichTextEditor({ value, onChange, placeholder }: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);

  function exec(command: string, val?: string) {
    document.execCommand(command, false, val);
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  }

  function handleInput() {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  }

  function handleBlur() {
    if (editorRef.current && editorRef.current.innerText.trim() === '') {
      editorRef.current.innerHTML = '';
    }
  }

  const buttons = [
    { icon: Bold, command: 'bold', title: 'Gras' },
    { icon: Italic, command: 'italic', title: 'Italique' },
    { icon: Underline, command: 'underline', title: 'Souligné' },
    { icon: Heading2, command: 'formatBlock', val: '<h2>', title: 'Titre' },
    { icon: List, command: 'insertUnorderedList', title: 'Liste à puces' },
    { icon: ListOrdered, command: 'insertOrderedList', title: 'Liste numérotée' },
    { icon: Quote, command: 'formatBlock', val: '<blockquote>', title: 'Citation' },
  ];

  return (
    <div className="overflow-hidden rounded-xl border border-slate-200">
      <div className="flex flex-wrap items-center gap-1 border-b border-slate-100 bg-slate-50 px-2 py-1.5">
        {buttons.map((btn) => {
          const Icon = btn.icon;
          return (
            <button
              key={btn.title}
              type="button"
              title={btn.title}
              onClick={() => exec(btn.command, btn.val)}
              className="rounded-lg p-2 text-slate-500 transition-colors hover:bg-slate-200 hover:text-slate-700"
            >
              <Icon size={16} />
            </button>
          );
        })}
        <button
          type="button"
          title="Lien"
          onClick={() => {
            const url = prompt('URL du lien:');
            if (url) exec('createLink', url);
          }}
          className="rounded-lg p-2 text-slate-500 transition-colors hover:bg-slate-200 hover:text-slate-700"
        >
          <LinkIcon size={16} />
        </button>
      </div>
<div
  ref={editorRef}
  contentEditable
  onInput={handleInput}
  onBlur={handleBlur}
  data-placeholder={placeholder}
  suppressContentEditableWarning
  className="min-h-[180px] px-4 py-3 text-sm text-slate-700 outline-none prose prose-sm max-w-none focus:outline-none empty:before:text-slate-400 empty:before:content-[attr(data-placeholder)]"
/>
    </div>
  );
}
