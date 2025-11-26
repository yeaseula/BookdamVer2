"use client"
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { useAuthStore } from "@/app/lib/userfetch";
import Skeleton from "react-loading-skeleton";

const FullCalBox = styled.div`
    padding: 15px 15px 10px 15px;
    border-radius: 12px;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
    border: 1px solid #e0e0e0;

    .fc-theme-standard .fc-scrollgrid,
    .fc-theme-standard td,
    .fc-theme-standard th {
        border-color: transparent;
    }

    .fc .fc-toolbar.fc-header-toolbar {
        display: block;
        position: relative;
        margin-bottom: 16px;
    }

    .fc .fc-toolbar-title {
        font-size: 1.8rem;
        font-weight: 700;
        text-align: center;
    }

    .fc .fc-button-group {
        position: absolute;
        top: 50%;
        right: 0;
        transform: translateY(-50%);
        gap: 5px;
    }

    .fc .fc-button-group button {
        margin: 0;
        padding: 0;
        width: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: var(--sub_color);
    }

    .fc .fc-button:focus-visible {
        border-color: var(--point-color);
    }

    .fc .fc-button .fc-icon {
        font-size: 1.2rem;
        line-height: 1.2;
    }

    .fc .fc-view-harness {
        min-height: 180px;
    }

    .fc .fc-col-header-cell-cushion {
        font-size: 12px;
    }

    .fc .fc-daygrid-day-top {
        justify-content: center;
    }

    .fc .fc-day-other .fc-daygrid-day-top {
        justify-content: center;
    }
    .fc .fc-daygrid-day-number {
        font-size: 12px;
    }
    .fc-today-button {
        display:none !important;
    }
    .fc-daygrid-body-unbalanced .fc-daygrid-day-events {
        display: none !important;
    }
    .fc-theme-standard td.simple {
        position: relative;
    }
    .fc-theme-standard td.simple .fc-daygrid-day-frame::after {
        content: "";
        display: block;
        width: 70%;
        height: 70%;
        background: url("../img/stamp.svg") no-repeat;
        background-size: contain;
        background-position: center;
        position: absolute;
        top: 50%;
        left: 50%;
        z-index: 10;
        transform: translate(-50%, -50%);
        opacity: 0.7;
    }
`

export default function Calendar({stampDate}: { stampDate: string[] }) {

    const { isReviewLoaded } = useAuthStore()

    return (
        <section className="pt-8 pr-5 pl-5">
            <h2 className="sr-only">나의 독서 스탬프 캘린더</h2>
            <div id="calendar-skeleton" className="calendar-skeleton"></div>
            {!isReviewLoaded && (
                <Skeleton height={361} />
            )}
            {isReviewLoaded && (
            <FullCalBox>
                <FullCalendar
                    key={stampDate.join()}
                    plugins={[dayGridPlugin]}
                    initialView="dayGridMonth"
                    dayCellDidMount={(info) => {
                        const dateStr = info.date.toISOString().split("T")[0];
                        const exist = stampDate.find(e => e === dateStr);
                        if (!exist) return;

                        info.el.style.backgroundImage = "url(/images/stamp.svg)";
                        info.el.style.backgroundSize = "auto";
                        info.el.style.backgroundRepeat = "no-repeat";
                        info.el.style.backgroundPosition = "center";
                    }}
                />
            </FullCalBox>
            )}
        </section>
    )
}