from google.cloud import documentai_v1beta2 as documentai
import re
import sys
def parse_table(project_id,input_uri):
    """Parse a form"""

    client = documentai.DocumentUnderstandingServiceClient()

    gcs_source = documentai.types.GcsSource(uri=input_uri)

    # mime_type can be application/pdf, image/tiff,
    # and image/gif, or application/json
    input_config = documentai.types.InputConfig(
        gcs_source=gcs_source, mime_type='application/pdf')

    # Improve table parsing results by providing bounding boxes
    # specifying where the box appears in the document (optional)
    table_bound_hints = [
        documentai.types.TableBoundHint(
            page_number=1,
            bounding_box=documentai.types.BoundingPoly(
                # Define a polygon around tables to detect
                # Each vertice coordinate must be a number between 0 and 1
                normalized_vertices=[
                    # Top left
                    documentai.types.geometry.NormalizedVertex(
                        x=0,
                        y=0
                    ),
                    # Top right
                    documentai.types.geometry.NormalizedVertex(
                        x=1,
                        y=0
                    ),
                    # Bottom right
                    documentai.types.geometry.NormalizedVertex(
                        x=1,
                        y=1
                    ),
                    # Bottom left
                    documentai.types.geometry.NormalizedVertex(
                        x=0,
                        y=1
                    )
                ]
            )
        )
    ]

    # Setting enabled=True enables form extraction
    table_extraction_params = documentai.types.TableExtractionParams(
        enabled=True, table_bound_hints=table_bound_hints)

    # Location can be 'us' or 'eu'
    parent = 'projects/{}/locations/us'.format(project_id)
    request = documentai.types.ProcessDocumentRequest(
        parent=parent,
        input_config=input_config,
        table_extraction_params=table_extraction_params)

    document = client.process_document(request=request)
    
    def _get_text(el):
        """Convert text offset indexes into text snippets.
        """
        response = ''
        # If a text segment spans several lines, it will
        # be stored in different text segments.
        for segment in el.text_anchor.text_segments:
            start_index = segment.start_index
            end_index = segment.end_index
            response += document.text[start_index:end_index]
        
        return response
    pdf_filename = re.findall("[ \w-]+?(?=\.)", input_uri)
    pdf_filename=pdf_filename[0]
    print("pdf_filename",pdf_filename)
    file_name_txt='/home/srinidhi/angular/uploads/'+pdf_filename+'.txt'
    for page in document.pages:
        file=open(file_name_txt,"a")
        # file.write('Page number: {}'.format(page.page_number))
        for table_num, table in enumerate(page.tables):
            #file.write('Table {}: '.format(table_num))
            for row_num, row in enumerate(table.header_rows):
                cells = '\t'.join([_get_text(cell.layout) for cell in row.cells])
                file.write('Row:{}'.format(cells))
            for row_num, row in enumerate(table.body_rows):
                cells = '\t'.join([_get_text(cell.layout) for cell in row.cells])
                file.write('Row:{}'.format(cells))
        file.close()
   
def main():
    file_path = sys.argv[1]
    
    parse_table('rmi-insights',file_path)
if __name__== "__main__":
    main()
