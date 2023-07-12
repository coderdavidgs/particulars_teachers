import { PageTitleContainer, PageTitleStyled, PageSubTitleStyled } from "./styles";

export interface PageTitleProps {
    title: string;
    subtitle?: string;
}

const PageTitle: React.FC<PageTitleProps> = ({ title, subtitle }) => {
    return(
        <PageTitleContainer>
            <PageTitleStyled color={"primary"}>
                {title}
            </PageTitleStyled>

            <PageSubTitleStyled>
                {subtitle}
            </PageSubTitleStyled>
        </PageTitleContainer>
    )
};

export default PageTitle;