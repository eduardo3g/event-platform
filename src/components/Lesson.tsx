import { CheckCircle, Lock } from "phosphor-react";
import { isPast, format } from "date-fns";
import { Link, useParams } from "react-router-dom";
import classNames from "classnames";

interface LessonProps {
  title: string;
  slug: string;
  availableAt: Date;
  type: "live" | "class";
}

export function Lesson({ title, slug, availableAt, type }: LessonProps) {
  const { slug: slugParam } = useParams<{ slug: string }>();

  const isLessonAvailable = isPast(availableAt);
  const formattedAvailableDate = format(
    availableAt,
    "EEEE' • 'MMMM d' • 'k'h'mm"
  );

  const isActiveLesson = slugParam === slug;

  return (
    <Link to={`/event/lesson/${slug}`} className="group">
      <span className="text-gray-300">{formattedAvailableDate}</span>

      <div
        className={classNames(
          "rounded border border-gray-500 p-4 mt-2 group-hover:border-green-500",
          {
            "bg-green-500": isActiveLesson,
          }
        )}
      >
        <header className="flex items-center justify-between">
          {isLessonAvailable ? (
            <span
              className={classNames(
                "text-sm  font-medium flex items-center gap-2",
                {
                  "text-white": isActiveLesson,
                  "text-blue-500": !isActiveLesson,
                }
              )}
            >
              <CheckCircle size={20} />
              Content available
            </span>
          ) : (
            <span className="text-sm text-orange-500 font-medium flex items-center gap-2">
              <Lock size={20} />
              Content {isLessonAvailable ? "available" : "unavailable"}
            </span>
          )}
          <span
            className={classNames(
              "text-xs rounded py-[0.125rem] px-2 text-white border",
              {
                "border-white": isActiveLesson,
                "border-x-green-300": !isActiveLesson,
              }
            )}
          >
            {type === "live" ? "LIVE" : "CLASS"}
          </span>
        </header>

        <strong
          className={classNames("mt-5 block", {
            "text-white": isActiveLesson,
            "text-gray-200": !isActiveLesson,
          })}
        >
          {title}
        </strong>
      </div>
    </Link>
  );
}
