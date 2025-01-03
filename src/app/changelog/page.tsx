import { promises as fs } from "fs";
import path from "path";

export default async function Changelog() {
  // Read changelog file
  const changelogPath = path.join(process.cwd(), "CHANGELOG.md");
  const content = await fs.readFile(changelogPath, "utf8");

  // Split by version sections
  const sections = content.split("\n## ").slice(1);

  return (
    <div className="flex flex-col items-center py-16">
      <article className="w-full max-w-3xl mx-auto px-6 mt-8">
        <div className="bg-white shadow-sm overflow-hidden rounded-sm">
          <div className="p-20">
            <h1 className="text-[#2F363F] text-xl font-medium tracking-tight mb-8">
              Changelog
            </h1>

            <div className="space-y-12">
              {sections.map((section, index) => {
                const [header, ...content] = section.split("\n");
                const [version, date] =
                  header.match(/\[(.*?)\].*?(\d{4}-\d{2}-\d{2})/)?.slice(1) ||
                  [];

                return (
                  <div key={index}>
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-xs font-medium px-2 py-1 rounded-full bg-[#3478F6]/10 text-[#3478F6]">
                        v{version}
                      </span>
                      <time className="text-xs text-gray-500">{date}</time>
                    </div>

                    <div className="prose prose-gray max-w-none text-sm">
                      {content.map((line, i) => {
                        if (line.startsWith("### ")) {
                          return (
                            <h3
                              key={i}
                              className="text-sm font-medium text-[#2F363F] mb-3"
                            >
                              {line.replace("### ", "")}
                            </h3>
                          );
                        }
                        if (line.startsWith("- ")) {
                          return (
                            <div
                              key={i}
                              className="flex items-start mb-2 last:mb-0"
                            >
                              <span className="text-[#3478F6] mr-2">•</span>
                              <span className="text-gray-600">
                                {line.replace("- ", "")}
                              </span>
                            </div>
                          );
                        }
                        return null;
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}
