# _plugins/table_math_fix.rb
# Pre-processes markdown tables before kramdown parses them,
# temporarily replacing LaTeX expressions with safe placeholders
# to prevent the pipe character (|) from conflicting with table syntax.

Jekyll::Hooks.register :documents, :pre_render do |doc|
  doc.content = fix_math_in_tables(doc.content)
end

Jekyll::Hooks.register :pages, :pre_render do |page|
  page.content = fix_math_in_tables(page.content)
end

def fix_math_in_tables(content)
  content.gsub(/^\|.+\|$/m) do |table_block|
    placeholders = {}
    counter = 0

    # Replace all $...$ expressions inside table rows with safe tokens
    protected = table_block.gsub(/\$([^$\n]+)\$/) do |match|
      token = "MATHPLACEHOLDER#{counter}END"
      placeholders[token] = match
      counter += 1
      token
    end

    # Restore original LaTeX after kramdown has parsed the table structure
    placeholders.each do |token, original|
      protected = protected.gsub(token, original)
    end

    protected
  end
end