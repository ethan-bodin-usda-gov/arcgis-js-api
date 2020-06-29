// COPYRIGHT © 2020 Esri
//
// All rights reserved under the copyright laws of the United States
// and applicable international laws, treaties, and conventions.
//
// This material is licensed for use under the Esri Master License
// Agreement (MLA), and is bound by the terms of that agreement.
// You may redistribute and use this code without modification,
// provided you adhere to the terms of the MLA and include this
// copyright notice.
//
// See use restrictions at http://www.esri.com/legal/pdfs/mla_e204_e300/english
//
// For additional information, contact:
// Environmental Systems Research Institute, Inc.
// Attn: Contracts and Legal Services Department
// 380 New York Street
// Redlands, California, USA 92373
// USA
//
// email: contracts@esri.com
//
// See http://js.arcgis.com/4.15/esri/copyright.txt for details.

define(["require","exports","./engine/Bitmap","./engine/BitmapContainer","./engine/BitmapTile","./engine/Container","./engine/webgl/TileContainer","./engine/DisplayObject","./engine/RasterTile","./engine/RasterTileContainer","./engine/Stage","./engine/webgl/AttributeStoreView","./engine/webgl/collisions/CollisionGrid","./engine/webgl/collisions/CollisionEngine","./engine/webgl/collisions/LayerViewSorter","./engine/webgl/Geometry","./engine/webgl/alignmentUtils","./engine/webgl/color","./engine/webgl/definitions","./engine/webgl/enums","./engine/webgl/fontUtils","./engine/webgl/Utils","./engine/webgl/brushes/BrushBitmap","./engine/webgl/brushes/BrushClip","./engine/webgl/brushes/BrushRasterBitmap","./engine/webgl/brushes/WGLBrushInfo","./engine/webgl/brushes/WGLBrushStencil","./engine/webgl/brushes/WGLBrushVTLBackground","./engine/webgl/brushes/WGLBrushVTLCircle","./engine/webgl/brushes/WGLBrushVTLFill","./engine/webgl/brushes/WGLBrushVTLLine","./engine/webgl/brushes/WGLBrushVTLSymbol","./engine/webgl/brushes/WGLGeometryBrush","./engine/webgl/brushes/WGLGeometryBrushFill","./engine/webgl/brushes/WGLGeometryBrushLabel","./engine/webgl/brushes/WGLGeometryBrushLine","./engine/webgl/brushes/WGLGeometryBrushMarker","./engine/webgl/brushes/WGLGeometryBrushText","./engine/webgl/util/debug","./engine/webgl/mesh/templates/shapingUtils","./engine/webgl/TileClipper","./engine/webgl/TurboLine","./engine/webgl/mesh/factories/matcherUtils","./engine/webgl/mesh/factories/WGLMeshFactory","./engine/webgl/mesh/MeshData","./engine/webgl/mesh/templates/WGLTemplateStore","./engine/webgl/Painter","./engine/webgl/TileData","./engine/webgl/util/BidiText","./engine/webgl/util/Matcher","./engine/webgl/util/vvFlagUtils","./engine/webgl/visualVariablesUtils","./engine/webgl/WGLRendererInfo","./engine/webgl/WGLTile","./engine/webgl/BitBlitRenderer","./engine/webgl/shaders/MagnifierPrograms","../../symbols/cim/CIMSymbolHelper","./engine/webgl/Rect","./engine/webgl/mesh/templates/util","./engine/webgl/painter/RenderPass","./engine/webgl/TiledDisplayObject","./engine/BitmapTileContainer","./engine/LevelDependentSizeVariable"],(function(e,i,n,l,t,r,a,s,g,b,o,u,h,p,L,m,w,T,d,B,G,c,f,V,y,C,S,W,M,R,D,F,P,O,I,U,x,j,v,k,z,A,E,H,_,q,J,K,N,Q,X,Y,Z,$,ee,ie,ne,le,te,re,ae,se,ge){Object.defineProperty(i,"__esModule",{value:!0}),i.Bitmap=n.Bitmap,i.BitmapContainer=l.BitmapContainer,i.BitmapTile=t.BitmapTile,i.Container=r.Container,i.TileContainer=a.default,i.DisplayObject=s.DisplayObject,i.RasterTile=g.RasterTile,i.RasterTileContainer=b.RasterTileContainer,i.Stage=o.Stage,i.AttributeStoreView=u.AttributeStoreView,i.CollisionGrid=h.CollisionGrid,i.CollisionEngine=p.CollisionEngine,i.LayerViewSorter=L.LayerViewSorter,i.Point=m.Point,i.alignmentUtils=w,i.color=T,i.definitions=d,i.enums=B,i.fontUtils=G,i.Utils=c,i.debug=v,i.ShapedGlyph=k.ShapedGlyph,i.shapeGlyphs=k.shapeGlyphs,i.ShapingInfo=k.ShapingInfo,i.TileClipper=z.TileClipper,i.SimpleBuilder=z.SimpleBuilder,i.tessellate=A.tessellate,i.TessellationState=A.TessellationState,i.splitVertex=A.splitVertex,i.createMatcher=E.createMatcher,i.WGLMeshFactory=H.WGLMeshFactory,i.MeshData=_.MeshData,i.WGLTemplateStore=q.WGLTemplateStore,i.Painter=J.default,i.PainterOptions=J.PainterOptions,i.TileData=K.TileData,i.bidiText=N.bidiText,i.FeatureMatcher=Q.FeatureMatcher,i.getVVFlags=X.getVVFlags,i.getTypeOfSizeVisualVariable=Y.getTypeOfSizeVisualVariable,i.WGLRendererInfo=Z.WGLRendererInfo,i.WGLTile=$.WGLTile,i.BitBlitRenderer=ee.BitBlitRenderer,i.createMagnifierProgram=ie.createMagnifierProgram,i.magnifier=ie.magnifier,i.CIMSymbolHelper=ne.CIMSymbolHelper,i.Rect=le.default,i.getLimitCosine=te.getLimitCosine,function(e){e.Geometry=P.default,e.Marker=x.default,e.Line=U.default,e.Fill=O.default,e.Text=j.default,e.Label=I.default,e.Clip=V.default,e.Stencil=S.default,e.Bitmap=f.default,e.Raster=y.default,e.TileInfo=C.default,e.VTLBackground=W.WGLBrushVTLBackground,e.VTLFill=R.WGLBrushVTLFill,e.VTLLine=D.WGLBrushVTLLine,e.VTLCircle=M.WGLBrushVTLCircle,e.VTLSymbol=F.WGLBrushVTLSymbol}(i.brushes||(i.brushes={})),i.RenderPass=re.default,i.TiledDisplayObject=ae.TiledDisplayObject,i.BitmapTileContainer=se.BitmapTileContainer,i.LevelDependentSizeVariable=ge.LevelDependentSizeVariable}));