// VEDIC TREE OS — Communication Template Compiler & Sanitizer (Module 05)

export class TemplateEngine {
  /**
   * Extract all variable tags from a template string
   * e.g. "Hello {{studentName}}, your fee of {{amount}} is due on {{dueDate}}" -> ["studentName", "amount", "dueDate"]
   * @param {string} text
   * @returns {string[]}
   */
  static extractVariables(text) {
    if (!text || typeof text !== 'string') return [];
    const matches = text.match(/\{\{([a-zA-Z0-9_]+)\}\}/g) || [];
    return Array.from(new Set(matches.map(m => m.replace(/[{}]/g, '').trim())));
  }

  /**
   * Render a template body by substituting {{variables}}
   * @param {string} templateString
   * @param {Record<string, any>} contextValues
   * @param {Object} options
   * @returns {{ rendered: string, missingVariables: string[] }}
   */
  static render(templateString, contextValues = {}, options = { fallbackToEmpty: false }) {
    if (!templateString) return { rendered: '', missingVariables: [] };

    const missingVariables = [];
    const rendered = templateString.replace(/\{\{([a-zA-Z0-9_]+)\}\}/g, (_match, varName) => {
      if (contextValues[varName] !== undefined && contextValues[varName] !== null) {
        return String(contextValues[varName]);
      }
      missingVariables.push(varName);
      return options.fallbackToEmpty ? '' : `[${varName}]`;
    });

    return {
      rendered,
      missingVariables
    };
  }
}
