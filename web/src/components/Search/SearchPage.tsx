import {FC, useEffect} from "react";
import {observer} from "mobx-react-lite";
import {useLanguage} from "../../context/Translation";
import {searchService} from "../../services/search";
import {organizationService} from "../../services/organizations";
import {projectService} from "../../services/projects";
import {productService} from "../../services/product";
import {researchCenterService} from "../../services/researchCenter";
import {scrollTopPage} from "../../utils";
import Spinner from "../common/Spinner/Spinner";
import Header from "../common/Header/Header";
import Carousel from "../common/Carousel/Carousel";
import Breadcrumb from "../common/Breadcrumb/Breadcrumb";

const SearchPage: FC = () => {
  const {language} = useLanguage();
  const {organizations, products, projects, ResearchCenters, UseCase, loading} = searchService

  useEffect(() => {
    organizationService.fetchPagingOrganizations(0, language)
    projectService.fetchPagingProjects(0, language)
    productService.fetchPagingProducts(0, language)
    researchCenterService.fetchPagingResearchCenters(0, language)
  }, [language]);

  const handlePageChangeOrganization = (page: number) => {
    organizationService.fetchPagingOrganizations(page, language);
    scrollTopPage();
  };
  const handlePageChangeProduct = (page: number) => {
    productService.fetchPagingProducts(page, language)
    scrollTopPage();
  };
  const handlePageChangeProject = (page: number) => {
    projectService.fetchPagingProjects(page, language)
    scrollTopPage();
  };
  const handlePageChangeResearchCenter = (page: number) => {
    researchCenterService.fetchPagingResearchCenters(page, language)
    scrollTopPage();
  };

  return<>
    {loading ? (
        <Spinner/>
    ) : (<>
          <Header/>
          <Carousel/>
          <Breadcrumb/>

        </>

    )}
  </>
}

export default observer(SearchPage)